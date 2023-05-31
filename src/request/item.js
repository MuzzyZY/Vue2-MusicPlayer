import service from "./api";
// 获取歌词
export function getMusicLyric(data){
  return service({
    method:'GET',
    url:`/lyric?id=${data}`,
  })
}

// 获取热门歌单列表
export function getPopMusicList(data){
  return service({
    method:'GET',
    url:'/top/playlist?limit=20&order=hot'
  })
}

// 获取精品推荐歌单列表
export function getClassicMusicList(data){
  return service({
    method:'GET',
    url:'/top/playlist/highquality'
  })
}

// 获取电台列表
export function getDjList(data){
  return service({
    method:'GET',
    url:'/dj/hot?limit=20'
  })
}

// 获取热门歌单列表
export function getHotList(data){
  return service({
    method:'GET',
    url:'/top/playlist/highquality?limit=100'
  })
}

// 搜索功能
export function getSearch(data){
  return service({
    url:`/search?keywords=${data}&limit=50`
  })
}

// 登录功能
export function getPhoneLogin(data){
  return service({
    url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}