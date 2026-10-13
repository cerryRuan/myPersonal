// 图片生成 API 基础路径
const IMG_API =
  "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=";

// 头像
export const avatar =
  IMG_API +
  encodeURIComponent(
    "professional portrait of a creative young person, soft studio lighting, modern aesthetic, minimal dark background, cinematic",
  ) +
  "&image_size=portrait_4_3";

// 个人信息
export const profile = {
  name: "阮奎荣",
  nameEn: "Ruan Kuirong",
  title: "前端开发者 · 摄影爱好者 · 音乐探索者",
  tagline: "用代码编织梦想，用镜头记录瞬间，用旋律感受生活",
  bio: "热爱技术与创意的交叉地带。白天写代码构建数字世界，夜晚拿起相机捕捉光影，戴上耳机沉浸在旋律中。相信每一行代码、每一张照片、每一段旋律，都是表达自我的方式。",
  location: "杭州，中国",
  email: "ruankuirong@foxmail.com",
  socials: [
    { name: "GitHub", url: "#", icon: "github" },
    { name: "Instagram", url: "#", icon: "instagram" },
    { name: "Bilibili", url: "#", icon: "bilibili" },
    { name: "Spotify", url: "#", icon: "spotify" },
  ],
  stats: [
    { label: "代码提交", value: "3000+" },
    { label: "摄影作品", value: "500+" },
    { label: "播放歌单", value: "200+" },
    { label: "旅行城市", value: "28" },
  ],
  skills: [
    { name: "React / Vue", level: 92 },
    { name: "TypeScript", level: 85 },
    { name: "摄影 & 后期", level: 78 },
    { name: "UI/UX 设计", level: 72 },
  ],
};

// 兴趣爱好 - 视频集
export const videos = [
  {
    title: "清晨的城市苏醒",
    desc: "延时摄影记录上海的日出与城市的苏醒",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster:
      IMG_API +
      encodeURIComponent(
        "cinematic city skyline at sunrise, golden light, urban landscape, tall buildings, time-lapse photography aesthetic",
      ) +
      "&image_size=landscape_16_9",
  },
  {
    title: "山林间的漫步",
    desc: "周末徒步穿越竹林小径",
    src: "https://www.w3schools.com/html/movie.mp4",
    poster:
      IMG_API +
      encodeURIComponent(
        "lush green bamboo forest path, sunlight filtering through leaves, nature hike, serene atmosphere",
      ) +
      "&image_size=landscape_16_9",
  },
];

// 兴趣爱好 - 照片墙
export const photos = [
  {
    src:
      IMG_API +
      encodeURIComponent(
        "mountain landscape at golden sunset, dramatic clouds, aerial view, vibrant colors",
      ) +
      "&image_size=square",
    title: "日落山巅",
    category: "风景",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "neon city street at night, cyberpunk aesthetic, rain reflections, vibrant lights",
      ) +
      "&image_size=portrait_4_3",
    title: "霓虹之夜",
    category: "城市",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "cozy coffee shop interior, warm lighting, latte art, wooden table, aesthetic",
      ) +
      "&image_size=square",
    title: "咖啡时光",
    category: "生活",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "ocean waves aerial view, turquoise water, white foam, tropical paradise",
      ) +
      "&image_size=landscape_4_3",
    title: "碧海蓝天",
    category: "风景",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "autumn maple leaves close-up, red and orange, bokeh background, nature",
      ) +
      "&image_size=portrait_4_3",
    title: "秋日红叶",
    category: "自然",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "starry night sky over desert, milky way galaxy, long exposure photography",
      ) +
      "&image_size=landscape_16_9",
    title: "星空之下",
    category: "风景",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "vintage film camera on wooden desk, nostalgic mood, soft window light",
      ) +
      "&image_size=square",
    title: "旧时光",
    category: "生活",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "japanese cherry blossom street, pink sakura petals, spring atmosphere, soft light",
      ) +
      "&image_size=portrait_4_3",
    title: "樱花街道",
    category: "城市",
  },
  {
    src:
      IMG_API +
      encodeURIComponent(
        "misty mountain lake at dawn, calm water reflection, fog, serene minimalist",
      ) +
      "&image_size=landscape_4_3",
    title: "晨雾湖畔",
    category: "风景",
  },
];

// 兴趣爱好 - 音乐播放列表
export const music = [
  {
    title: "夜空中最亮的星",
    artist: "逃跑计划",
    cover:
      IMG_API +
      encodeURIComponent(
        "album cover art, starry night sky, glowing star, dark blue tones, minimal design",
      ) +
      "&image_size=square_hd",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "4:12",
  },
  {
    title: "夏日终曲",
    artist: "阮奎荣",
    cover:
      IMG_API +
      encodeURIComponent(
        "album cover art, summer sunset over ocean, warm orange and pink tones, dreamy",
      ) +
      "&image_size=square_hd",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "3:48",
  },
  {
    title: "城市漫步",
    artist: "Urban Walk",
    cover:
      IMG_API +
      encodeURIComponent(
        "album cover art, city street at dusk, neon lights, synthwave aesthetic, purple",
      ) +
      "&image_size=square_hd",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "5:21",
  },
  {
    title: "山林呼吸",
    artist: "Nature Sound",
    cover:
      IMG_API +
      encodeURIComponent(
        "album cover art, misty forest, green tones, tranquil nature, minimal",
      ) +
      "&image_size=square_hd",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: "4:35",
  },
  {
    title: "午夜电台",
    artist: "Midnight FM",
    cover:
      IMG_API +
      encodeURIComponent(
        "album cover art, vintage radio at night, warm glow, lo-fi aesthetic, cozy",
      ) +
      "&image_size=square_hd",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: "3:57",
  },
];

// 导航
export const navLinks = [
  { path: "/", label: "首页", labelEn: "Home" },
  { path: "/hobbies", label: "兴趣爱好", labelEn: "Hobbies" },
];
