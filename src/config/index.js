// 根据当前mode获取Base Url 类型
const env = process.env.REACT_APP_SSTIR_GRAPH;

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case 'dev':
      return {
        baseUrl: 'http://api.aikg.test.sstir.cn',
      };
    // production
    case 'prod':
      return {
        baseUrl: '',
      };
    case 'qa':
      return {
        baseUrl: 'http://api.aikg.test.sstir.cn',
      };
    // default: dev
    default:
      return {
        baseUrl: 'http://api.aikg.test.sstir.cn',
      };
  }
};

const centerWordMap = {
  知识库: 'zsk',
  度量学习: 'dlxx',
  机器翻译: 'jqfy',
  目标检测: 'mbjc',
  人脸识别: 'rlsb',
  推荐系统: 'tjxt',
  无人驾驶: 'wrjs',
  循环神经网络: 'xhsjwl',
  支持向量机: 'zcxlj',
  可解释性: 'kjsx',
  李飞飞: 'lff',
  吴恩达: 'wed',
  周志华: 'zzh',
  韩家炜: 'hjw',
  'Geoffrey Hinton': 'Geoffrey',
  'Michael I. Jordan': 'Michael',
  'Sebastian Thrun': 'Sebastian',
  'William T. Freeman': 'William',
  'Yann Lecun': 'Yann',
  'Yoshua Bengio': 'Yoshua',
};

const typeList = [
  { key: 'expert', name: '专家' },
  { key: 'keyword', name: '关键词' },
  { key: 'org', name: '组织' },
  { key: 'paper', name: '论文' },
  { key: 'patent', name: '专利' },
  // { key: 'project', name: '项目' },
  { key: 'honor', name: '荣誉' },
];

const appConfig = {
  baseUrl: getBaseUrl(env).baseUrl,
  centerWordMap: centerWordMap,
  typeList: typeList,
};

export default appConfig;
