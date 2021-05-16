import SparkMD5 from 'spark-md5';
import diagnoseApi from '@/api/diagnose';

const md5ChunkSize = 5 * 1024 * 1024; // TODO：为什么不配置和fileChunkSize成一样的
const fileChunkSize = 2 * 1024 * 1024; // 每片文件的大小

// 根据文件内容计算文件md值
function cumMd5(file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        const spark = new SparkMD5.ArrayBuffer();

        let start = 0;
        let end = file.size - md5ChunkSize > 0 ? md5ChunkSize : file.size;
        fr.onload = function(e) {
            spark.append(e.currentTarget.result);
            if (file.size - end) {
                resolve(spark.end());
            } else {
                start = end;
                end += file.size - md5ChunkSize > 0 ? md5ChunkSize : file.size;
                fr.readAsArrayBuffer(file.slice(start, end));
            }
        };
        fr.readAsArrayBuffer(file.slice(start, end));
        fr.onerror = err => {
            reject(err);
        };
    });
}

/**
 * @param {File} file 文件
 * @param {Object} fileItem 后台文件已上传分片信息
 *  {
        md5: '',  
        index: Number, 
        taskId:
    }
 * @param {Function} cb(index, totalPieces, md5, fileName)
 *
 */
export default async function upload(file, fileItem, cb) {
    const md5 = await cumMd5(file);
    let curPiece = fileItem.md5 === md5 ? fileItem.index : 0; // 当前切片index

    const fileSize = file.size;
    const fileName = file.name;
    const totalPieces = Math.ceil(fileSize / fileChunkSize); // 切片总数

    while (curPiece < totalPieces) {
        let start = fileChunkSize * curPiece;
        let end = start + fileChunkSize < fileSize ? start + fileChunkSize : fileSize;
        // 切割文件
        const chunk = file.slice(start, end);

        // let blobName = '${fname}.${index}.${fext}';
        // let blobFile = new File([blob], blobName);
        // let formData = new FormData();
        // formData.append('files', blobFile);

        // 封装上传formData
        const formData = new FormData();
        formData.append('file', chunk, fileName);
        formData.append(
            'data',
            JSON.stringify({
                uuid: 'abc',
                md5,
                index: curPiece + 1,
                totalPieces,
                fileName,
                fileSize,
                taskId: fileItem.taskId
            })
        );
        // 请求上传
        try {
            // const startTime = new Date().getTime();
            cb(curPiece, totalPieces, md5, fileName);
            const data = await diagnoseApi.uploadDataFiles(formData);
            // 上一片验证失败
            if (data.code === 201 && curPiece > 0) curPiece--;
            // 成功
            if (data.code === 200) curPiece++;
            cb(curPiece, totalPieces, md5, fileName);
            // 上传参数回调
            // const speed = fileChunkSize / (new Date().getTime() - startTime); // 本次上传速度
            // const restTime = ((fileSize - end) / speed / 1000 / 60).toFixed(1); // 预计剩余时间
            // const progress = Number(((curPiece / totalPieces) * 100).toFixed(2)); // 上传进度
        } catch (error) {
            console.error(error);
            break;
        }
    }
}
