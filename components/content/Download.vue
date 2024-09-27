<script lang="ts" setup>
import api from '@/assets/configs/api.json'
import DownloadCover from '@/components/component/DownloadCover.vue'
import DownloadVideo from '@/components/component/DownloadVideo.vue'

let menueShow: Ref<boolean> = ref(false);
let videoInfo: Ref<any> = ref({});
let download_config: Ref<any> = ref({});

const getDownloadConfig = async () => {
    storage.getMeta('local:config').then((config) => {
        download_config.value = config.download as {};
    });
};

const getBiliVideoInfo = () => {
    const regex: RegExp = /video\/([^?]+)/;
    const url: string = window.location.href;
    const matchResult: RegExpMatchArray | null = url.match(regex);
    let bvID: string = '';
    if (matchResult) {
        bvID = matchResult[1].replace(/\/$/, '');
        fetch(api.video_info.url + bvID, {
            method: api.video_info.method,
            headers: { 'Content-Type': 'application/json', },
            credentials: 'include',
        }).then(resp => resp.json()).then(data => {
            videoInfo.value = data;
            console.log(data);
        }).catch(err => {
            console.log("请求接口出现错误,请创建issues反馈信息");
            console.log(err);
        })
    } else {
        console.error("未匹配到视频bv号,检查是否为bilibili视频链接");
        videoInfo.value.data.title = "unknown";
        videoInfo.value.data.bvid = "unknown";
        videoInfo.value.data.owner.name = "unknown";
    }
};

const videoDownloadMenueSwitcher = () => {
    menueShow.value = !menueShow.value;
};

const downloadVideoCover = () => {
    alert("视频封面下载已启动,请稍等!");
    const coverUrl: string = videoInfo.value.data.pic;
    fetch(coverUrl.replace(/^http:\/\//, 'https://'))
        .then(resp => resp.blob())
        .then(data => {
            const link = document.createElement('a');
            const imageUrl = URL.createObjectURL(data);
            link.href = imageUrl;
            link.download = videoInfo.value.data.title + '.' + coverUrl.substring(coverUrl.lastIndexOf('.') + 1);
            link.click();
            alert("视频封面下载完成!");
            link.remove();
        }).catch(err => {
            alert("视频封面下载出现错误!");
            console.log("下载视频封面出现错误,请检查网络连接");
            console.log(err);
        })
};

const downloadVideo = async () => {
    alert("视频下载已启动,请稍等!");
    let streamMeta: object = {
        bvid: videoInfo.value.data.bvid,
        cid: videoInfo.value.data.cid,
        fnval: 1
    }
    let streamApi: string = api.video_stream.url;
    const streamUrl: string = streamApi.replace(/\$\{(\w+)\}/g, (match, key) => streamMeta[key as keyof typeof streamMeta]);
    fetch(streamUrl, {
        method: api.video_stream.method,
        credentials: 'include',
    }).then(resp => resp.json()).then(async data => {
        console.log(data);
        fetch(data.data.durl[0].url, {
            method: 'GET',
            credentials: 'include',
        }).then(resp => resp.blob()).then(data => {
            const link = document.createElement('a');
            const url = URL.createObjectURL(data);
            link.href = url;
            link.download = videoInfo.value.data.title + '.mp4';
            link.click();
            alert("视频下载完成!");
            link.remove();
        }).catch(err => {
            console.log("下载视频失败!");
            console.log(err);
        })
    }).catch(err => {
        console.log("请求接口出现错误,请创建issues反馈信息");
        console.log(err);
    })
};

onMounted(() => {
    getDownloadConfig();
    getBiliVideoInfo();
});
</script>

<template>
    <div class="download_video_container">
        <div class="download_button" @click="videoDownloadMenueSwitcher" title="下载功能">
            <img src="../../assets/svg/SolarDownloadOutline.svg">
        </div>
    </div>

    <div class="download_video_menue" v-if="menueShow">
        <el-card style="width: 100%; height: 100%; display: flex;" shadow="hover">
            <p>
                <el-text type="primary">标题:</el-text>
                <el-tooltip :content="videoInfo.data.title" placement="right" effect="light">
                    <el-text class="ellipsis">&nbsp;{{ videoInfo.data.title.length > 5 ? videoInfo.data.title.slice(0,
                        5) + '...' : videoInfo.data.title }}</el-text>
                </el-tooltip>
            </p>
            <p>
                <el-text type="primary">BV号:</el-text>
                <el-text>&nbsp;{{ videoInfo.data.bvid }}</el-text>
            </p>
            <p>
                <el-text type="primary">UP主:</el-text>
                <el-tooltip :content="videoInfo.data.owner.name" placement="right" effect="light">
                    <el-text>&nbsp;{{ videoInfo.data.owner.name > 5 ? videoInfo.data.owner.name.slice(0, 5) + '...' :
                        videoInfo.data.owner.name }}</el-text>
                </el-tooltip>

            </p>
            <div style="display: flex; flex-direction: column; width: 150px;gap: 5px;">
                <div class="button_container">
                    <el-button type="primary" round v-if="download_config.cover_video.enable"
                        @click="downloadVideoCover">
                        <DownloadCover />
                        下载封面
                    </el-button>
                </div>
                <div class="button_container">
                    <el-button type="primary" round v-if="download_config.download_video.enable" @click="downloadVideo">
                        <DownloadVideo />
                        下载视频
                    </el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.download_button {
    width: 100%;
    height: 30px;
}

.download_video_container {
    width: 30px;
    height: 30px;
    cursor: pointer;
}

.download_video_menue {
    width: 200px;
    height: 300px;
}

.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

p {
    width: 100%;
}

.button_container {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>