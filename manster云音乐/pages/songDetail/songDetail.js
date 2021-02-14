// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js';
import moment from 'moment';
import request from '../../utils/request';
//获取全局实例
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,//标识播放状态
    song: {},//歌曲详情对象
    musicId: '',//歌曲Id
    currentTime: '00:00',//当前时长
    durationTime:'00:00',//总时长
    currentWidth: 0,//实时进度条宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //options路由跳转参数
    let musicId = options.song;
    this.setData({
      musicId: musicId
    })
    this.getMusicInfo(musicId);

    //判断当前页面音乐是否在播放
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId){
      //修改当前页面音乐播放状态
      this.setData({
        isPlay: true
      })
    }

    //创建控制音乐播放实例对象
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    //监视音乐播放与暂停
    this.backgroundAudioManager.onPlay(()=>{
      //修改音乐播放状态
      this.changePlayState(true);

      appInstance.globalData.musicId = musicId;
    });
    this.backgroundAudioManager.onPause(()=>{
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(()=>{
      this.changePlayState(false);
    });
    //音乐播放自然结束
    this.backgroundAudioManager.onEnded(()=>{
      //切歌
      PubSub.publish('switchMusic','next');
      this.setData({
        currentWidth: 0,
        currentTime: '00:00'
      })
    })
    //监听音乐实时播放的进度
    this.backgroundAudioManager.onTimeUpdate(() => {
      let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss');
      let currentWidth = (this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration) * 450;
      this.setData({
        currentTime: currentTime,
        currentWidth: currentWidth
      })
    })
  },

  //修改播放状态
  changePlayState(isPlay){
    this.setData({
      isPlay: isPlay
    })
    //修改全局播放状态
    appInstance.globalData.isMusicPlay = isPlay;
  },
  //点击暂停/播放的回调
  handleMusicPlay(){
    //修改是否播放的状态
    let isPlay = !this.data.isPlay;
    // this.setData({
    //   isPlay: isPlay
    // })
    let {musicId} = this.data;
    this.musicControl(isPlay,musicId);
  },
  //请求歌曲信息
  async getMusicInfo(musicId){
    let songData = await request('/song/detail',{ids: musicId});
    let durationTime = moment(songData.songs[0].dt).format('mm:ss');
    this.setData({
      song: songData.songs[0],
      durationTime: durationTime
    })
    //动态修改窗口标题
    wx.setNavigationBarTitle({
      title: this.data.song.name
    })
  },

  //歌曲播放控制功能
  async musicControl(isPlay,musicId){

    if(isPlay){//音乐播放
      //获取音频资源
      let musicLinkData = await request('/song/url',{id: musicId})
      let musicLink = musicLinkData.data[0].url;
      //歌曲播放
      this.backgroundAudioManager.src = musicLink;
      this.backgroundAudioManager.title = this.data.song.name;
    }else{//音乐暂停
      this.backgroundAudioManager.pause();
    }
  },

  //歌曲切换
  handleSwitch(event){
    //切换类型
    let type = event.currentTarget.id;

    //关闭当前播放音乐
    this.backgroundAudioManager.stop();

    //订阅来自recommendSong页面
    PubSub.subscribe('musicId',(msg,musicId) => {
      //获取歌曲
      this.getMusicInfo(musicId);
      //自动播放当前音乐
      this.musicControl(true,musicId);
      //取消订阅
      PubSub.unsubscribe('musicId');
    })
    //发布消息数据给recommendSong页面
    PubSub.publish('switchMusic',type);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})