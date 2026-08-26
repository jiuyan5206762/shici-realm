import { Author, Poem } from '@/types';

export interface FamousPoetProfile extends Author {
  titleBadge?: string;
  poems: Poem[];
}

// Comprehensive curated database of famous historical poets and dynasties
export const FAMOUS_POETS_DIRECTORY: FamousPoetProfile[] = [
  // ==================== 先秦：屈原 · 诗经 ====================
  {
    id: 9619,
    name: '屈原',
    dynasty: { id: 1, name: '先秦' },
    titleBadge: '楚辞之祖',
    description: '战国时期楚国诗人、政治家，中国浪漫主义文学奠基人，“楚辞”创立者。',
    poemCount: 6,
    poems: [
      {
        id: 901001,
        title: '离骚 (节选)',
        author: { id: 9619, name: '屈原' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 70, name: '楚辞' },
        content: [
          '帝高阳之苗裔兮，朕皇考曰伯庸。',
          '摄提贞于孟陬兮，惟庚寅吾以降。',
          '皇览揆余初度兮，肇锡余以嘉名。',
          '名余曰正则兮，字余曰灵均。',
          '长太息以掩涕兮，哀民生之多艰。',
          '亦余心之所善兮，虽九死其犹未悔。',
        ],
      },
      {
        id: 901002,
        title: '九歌·湘夫人',
        author: { id: 9619, name: '屈原' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 70, name: '楚辞' },
        content: [
          '帝子降兮北渚，目眇眇兮愁予。',
          '袅袅兮秋风，洞庭波兮木叶下。',
          '登白薠兮骋望，与佳期兮夕张。',
          '鸟何萃兮蘋中，罾何为兮木上？',
        ],
      },
      {
        id: 901003,
        title: '九歌·国殇',
        author: { id: 9619, name: '屈原' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 70, name: '楚辞' },
        content: [
          '操吴戈兮被犀甲，车错毂兮短兵接。',
          '旌蔽日兮敌若云，矢交坠兮士争先。',
          '诚既勇兮又以武，终刚强兮不可凌。',
          '身既死兮神以灵，魂魄毅兮为鬼雄！',
        ],
      },
      {
        id: 901004,
        title: '九歌·山鬼',
        author: { id: 9619, name: '屈原' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 70, name: '楚辞' },
        content: [
          '若有人兮山之阿，被薜荔兮带女萝。',
          '既含睇兮又宜笑，子慕予兮善窈窕。',
          '乘赤豹兮从文狸，辛夷车兮结桂旗。',
          '风飒飒兮木萧萧，思公子兮徒离忧。',
        ],
      },
      {
        id: 901005,
        title: '九章·涉江',
        author: { id: 9619, name: '屈原' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 70, name: '楚辞' },
        content: [
          '余幼好此奇服兮，年既老而不衰。',
          '带长铗之陆离兮，冠切云之崔嵬。',
          '被明月兮珮宝璐，世溷浊而莫余知兮。',
          '吾与重华游兮瑶之圃，登昆仑兮食玉英。',
        ],
      },
      {
        id: 901006,
        title: '天问 (节选)',
        author: { id: 9619, name: '屈原' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 70, name: '楚辞' },
        content: [
          '曰：遂古之初，谁传道之？',
          '上下未形，何由考之？',
          '冥昭瞢暗，谁能极之？',
          '冯翼惟象，何以识之？',
        ],
      },
    ],
  },
  {
    id: 9610,
    name: '诗经',
    dynasty: { id: 1, name: '先秦' },
    titleBadge: '群经之首',
    description: '中国古代诗歌开山总集，收录西周初年至春秋中叶诗歌305篇。',
    poemCount: 6,
    poems: [
      {
        id: 901011,
        title: '关雎',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 50, name: '诗经' },
        content: [
          '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
          '参差荇菜，左右流之。窈窕淑女，寤寐求之。',
          '求之不得，寤寐思服。悠哉悠哉，辗转反侧。',
        ],
      },
      {
        id: 901012,
        title: '蒹葭',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 50, name: '诗经' },
        content: [
          '蒹葭苍苍，白露为霜。所谓伊人，在水一方。',
          '溯洄从之，道阻且长。溯游从之，宛在水中央。',
        ],
      },
      {
        id: 901013,
        title: '桃夭',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 50, name: '诗经' },
        content: [
          '桃之夭夭，灼灼其华。之子于归，宜其室家。',
          '桃之夭夭，有蕡其实。之子于归，宜其家室。',
        ],
      },
      {
        id: 901014,
        title: '采薇 (节选)',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 50, name: '诗经' },
        content: [
          '昔我往矣，杨柳依依。',
          '今我来思，雨雪霏霏。',
          '行道迟迟，载渴载饥。',
          '我心伤悲，莫知我哀！',
        ],
      },
      {
        id: 901015,
        title: '木瓜',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 50, name: '诗经' },
        content: [
          '投我以木瓜，报之以琼琚。匪报也，永以为好也！',
          '投我以木桃，报之以琼瑶。匪报也，永以为好也！',
        ],
      },
      {
        id: 901016,
        title: '子衿',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 50, name: '诗经' },
        content: [
          '青青子衿，悠悠我心。纵我不往，子宁不嗣音？',
          '一日不见，如三月兮！',
        ],
      },
    ],
  },

  // ==================== 两汉：汉乐府 · 古诗十九首 · 刘邦 · 汉武帝 · 项羽 · 司马相如 · 班婕妤 ====================
  {
    id: 9020,
    name: '汉乐府',
    dynasty: { id: 2, name: '两汉' },
    titleBadge: '两汉乐府',
    description: '汉代乐府民歌与古诗十九首，中国古代叙事诗与抒情诗的重要源头。',
    poemCount: 20,
    poems: [
      {
        id: 902001,
        title: '江南',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '江南可采莲，莲叶何田田。',
          '鱼戏莲叶间。',
          '鱼戏莲叶东，鱼戏莲叶西，鱼戏莲叶南，鱼戏莲叶北。',
        ],
      },
      {
        id: 902002,
        title: '长歌行',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '青青园中葵，朝露待日晞。',
          '阳春布德泽，万物生光辉。',
          '常恐秋节至，焜黄华叶衰。',
          '百川东到海，何时复西归？',
          '少壮不努力，老大徒伤悲！',
        ],
      },
      {
        id: 902003,
        title: '古诗十九首·迢迢牵牛星',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '迢迢牵牛星，皎皎河汉女。',
          '纤纤擢素手，札札弄机杼。',
          '终日不成章，泣涕零如雨。',
          '河汉清且浅，相去复几许？',
          '盈盈一水间，脉脉不得语。',
        ],
      },
      {
        id: 902004,
        title: '古诗十九首·行行重行行',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '行行重行行，与君生别离。',
          '相去万余里，各在天一涯。',
          '道路阻且长，会面安可知？',
          '弃捐勿复道，努力加餐饭。',
        ],
      },
      {
        id: 902005,
        title: '古诗十九首·涉江采芙蓉',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '涉江采芙蓉，兰泽多芳草。',
          '采之欲遗谁？所思在远道。',
          '同心而离居，忧伤以终老。',
        ],
      },
      {
        id: 902006,
        title: '陌上桑',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '日出东南隅，照我秦氏楼。秦氏有好女，自名为罗敷。',
          '罗敷喜蚕桑，采桑城南隅。青丝为笼系，桂枝为笼钩。',
          '头部倭堕髻，耳中明月珠。缃绮为下裙，紫绮为上襦。',
        ],
      },
      {
        id: 902007,
        title: '十五从军征',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '十五从军征，八十始得归。',
          '道逢乡里人：家中有阿谁？',
          '遥看是君家，松柏冢累累。',
          '出门东向看，泪落沾我衣。',
        ],
      },
      {
        id: 902008,
        title: '大风歌',
        author: { id: 9021, name: '刘邦' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '大风起兮云飞扬，',
          '威加海内兮归故乡，',
          '安得猛士兮守四方！',
        ],
      },
      {
        id: 902009,
        title: '秋风辞',
        author: { id: 9022, name: '汉武帝' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '秋风起兮白云飞，草木黄落兮雁南归。',
          '兰有秀兮菊有芳，怀佳人兮不能忘。',
          '少壮几时兮奈老何！',
        ],
      },
      {
        id: 902010,
        title: '白头吟',
        author: { id: 9023, name: '卓文君' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '皑如山上雪，皎若云间月。',
          '闻君有两意，故来相决绝。',
          '愿得一心人，白头不相离。',
        ],
      },
      {
        id: 902011,
        title: '垓下歌',
        author: { id: 9024, name: '项羽' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '力拔山兮气盖世。',
          '时不利兮骓不逝。',
          '骓不逝兮可奈何！',
          '虞兮虞兮奈若何！',
        ],
      },
      {
        id: 902012,
        title: '饮马长城窟行',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '青青河畔草，绵绵思远道。',
          '远道不可思，宿昔梦见之。',
          '客从远方来，遗我双鲤鱼。',
          '呼儿烹鲤鱼，中有尺素书。',
          '长跪读素书，书中竟何如？',
          '上言加餐食，下言长相忆。',
        ],
      },
      {
        id: 902013,
        title: '怨歌行',
        author: { id: 9025, name: '班婕妤' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '新裂齐纨素，鲜洁如霜雪。',
          '裁为合欢扇，团团似明月。',
          '出入君怀袖，动摇微风发。',
          '常恐秋节至，凉飙夺炎热。',
          '弃捐箧笥中，恩情中道绝。',
        ],
      },
      {
        id: 902014,
        title: '古诗十九首·青青陵上柏',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '青青陵上柏，磊磊涧中石。',
          '人生天地间，忽如远行客。',
          '斗酒相娱乐，聊厚不为薄。',
        ],
      },
      {
        id: 902015,
        title: '古诗十九首·今日良宴会',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '今日良宴会，欢乐难具陈。',
          '弹筝奋逸响，新声妙入神。',
          '人生寄一世，奄忽若飙尘。',
          '何不策高足，先据要路津。',
        ],
      },
      {
        id: 902016,
        title: '孔雀东南飞 (序与开篇)',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '孔雀东南飞，五里一徘徊。',
          '十三能织素，十四学裁衣，十五弹箜篌，十六诵诗书。',
          '十七为君妇，心中常苦悲。',
          '君既为府吏，守节情不移。',
        ],
      },
      {
        id: 902017,
        title: '战城南',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '战城南，死郭北，野死不葬乌可食。',
          '为我谓乌：且为客豪！',
          '野死谅不葬，腐肉安能去子逃？',
        ],
      },
      {
        id: 902018,
        title: '凤求凰',
        author: { id: 9026, name: '司马相如' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '凤兮凤兮归故乡，遨游四海求其凰。',
          '时未遇兮无所将，何悟今夕升斯堂！',
          '有艳淑女在闺房，室迩人遐毒我肠。',
          '何缘交颈为鸳鸯，胡颉颃兮共翱翔！',
        ],
      },
      {
        id: 902019,
        title: '古诗十九首·生年不满百',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '生年不满百，常怀千岁忧。',
          '昼短苦夜长，何不秉烛游！',
          '为乐当及时，何能待来兹？',
        ],
      },
      {
        id: 902020,
        title: '东门行',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '出东门，不顾归。来入门，怅欲悲。',
          '盎中无斗米储，还视架上无悬衣。',
          '拔剑东门去，舍中儿母牵衣啼。',
        ],
      },
    ],
  },

  // ==================== 魏晋：曹操 · 陶渊明 · 曹植 · 曹丕 · 阮籍 ====================
  {
    id: 8228,
    name: '曹操',
    dynasty: { id: 3, name: '魏晋' },
    titleBadge: '魏武帝',
    description: '字孟德，东汉末年杰出政治家、文学家，建安文学代表人物。',
    poemCount: 5,
    poems: [
      {
        id: 903001,
        title: '短歌行',
        author: { id: 8228, name: '曹操' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '对酒当歌，人生几何！譬如朝露，去日苦多。',
          '慨当以慷，忧思难忘。何以解忧？唯有杜康。',
          '青青子衿，悠悠我心。但为君故，沉吟至今。',
          '山不厌高，海不厌深。周公吐哺，天下归心。',
        ],
      },
      {
        id: 903002,
        title: '观沧海',
        author: { id: 8228, name: '曹操' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '东临碣石，以观沧海。水何澹澹，山岛竦峙。',
          '树木丛生，百草丰茂。秋风萧瑟，洪波涌起。',
          '日月之行，若出其中；星汉灿烂，若出其里。',
          '幸甚至哉，歌以咏志。',
        ],
      },
      {
        id: 903003,
        title: '龟虽寿',
        author: { id: 8228, name: '曹操' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '神龟虽寿，犹有竟时；螣蛇乘雾，终为土灰。',
          '老骥伏枥，志在千里；烈士暮年，壮心不已。',
          '盈缩之期，不但在天；养怡之福，可得永年。',
        ],
      },
      {
        id: 903004,
        title: '蒿里行',
        author: { id: 8228, name: '曹操' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '白骨露于野，千里无鸡鸣。生民百遗一，念之断人肠。',
        ],
      },
      {
        id: 903005,
        title: '苦寒行',
        author: { id: 8228, name: '曹操' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '北上太行山，艰哉何巍巍！羊肠坂诘屈，车轮为之摧。',
        ],
      },
    ],
  },
  {
    id: 9035,
    name: '陶渊明',
    dynasty: { id: 3, name: '魏晋' },
    titleBadge: '五柳先生',
    description: '字元亮，号五柳先生，世称靖节先生，田园诗派开创者。',
    poemCount: 6,
    poems: [
      {
        id: 903501,
        title: '饮酒·其五',
        author: { id: 9035, name: '陶渊明' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '结庐在人境，而无车马喧。',
          '问君何能尔？心远地自偏。',
          '采菊东篱下，悠然见南山。',
          '山气日夕佳，飞鸟相与还。',
          '此中有真意，欲辨已忘言。',
        ],
      },
      {
        id: 903502,
        title: '归园田居·其一',
        author: { id: 9035, name: '陶渊明' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '少无适俗韵，性本爱丘山。',
          '误落尘网中，一去三十年。',
          '羁鸟恋旧林，池鱼思故渊。',
          '开荒南野际，守拙归园田。',
          '久在樊笼里，复得返自然。',
        ],
      },
      {
        id: 903503,
        title: '归园田居·其三',
        author: { id: 9035, name: '陶渊明' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '种豆南山下，草盛豆苗稀。',
          '晨兴理荒秽，带月荷锄归。',
          '道狭草木长，夕露沾我衣。',
          '衣沾不足惜，但使愿无违。',
        ],
      },
      {
        id: 903504,
        title: '杂诗·其一',
        author: { id: 9035, name: '陶渊明' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '人生无根蒂，飘如陌上尘。',
          '盛年不重来，一日难再晨。',
          '及时当勉励，岁月不待人。',
        ],
      },
      {
        id: 903505,
        title: '读山海经·其一',
        author: { id: 9035, name: '陶渊明' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '孟夏草木长，绕屋树扶疏。众鸟欣有托，吾亦爱吾庐。',
          '微雨从东来，好风与之俱。俯仰终宇宙，不乐复何如？',
        ],
      },
      {
        id: 903506,
        title: '乞食',
        author: { id: 9035, name: '陶渊明' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '饥来驱我去，不知竟何之。行行至斯里，叩门拙言辞。',
        ],
      },
    ],
  },
  {
    id: 9036,
    name: '曹植',
    dynasty: { id: 3, name: '魏晋' },
    titleBadge: '陈思王',
    description: '字子建，三国曹魏著名文学家，才高八斗。',
    poemCount: 4,
    poems: [
      {
        id: 903601,
        title: '七步诗',
        author: { id: 9036, name: '曹植' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '煮豆燃豆萁，豆在釜中泣。',
          '本是同根生，相煎何太急？',
        ],
      },
      {
        id: 903602,
        title: '白马篇',
        author: { id: 9036, name: '曹植' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '白马饰金羁，连翩西北驰。',
          '借问谁家子，幽并游侠儿。',
          '捐躯赴国难，视死忽如归！',
        ],
      },
      {
        id: 903603,
        title: '洛神赋 (名句)',
        author: { id: 9036, name: '曹植' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 99, name: '其他' },
        content: [
          '翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松。',
          '髣髴兮若轻云之蔽月，飘飖兮若流风之回雪。',
        ],
      },
    ],
  },

  // ==================== 南北朝 · 隋代 ====================
  {
    id: 9040,
    name: '南北朝民歌',
    dynasty: { id: 4, name: '南北朝' },
    titleBadge: '南北朝乐府',
    description: '南北朝时期的民歌精华，《木兰诗》、《敕勒歌》等千古传诵。',
    poemCount: 6,
    poems: [
      {
        id: 904001,
        title: '木兰诗 (节选)',
        author: { id: 9040, name: '南北朝民歌' },
        dynasty: { id: 4, name: '南北朝' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '唧唧复唧唧，木兰当户织。不闻机杼声，惟闻女叹息。',
          '万里赴戎机，关山度若飞。朔气传金柝，寒光照铁衣。',
          '将军百战死，壮士十年归。',
          '雄兔脚扑朔，雌兔眼迷离；双兔傍地走，安能辨我是雄雌？',
        ],
      },
      {
        id: 904002,
        title: '敕勒歌',
        author: { id: 9040, name: '南北朝民歌' },
        dynasty: { id: 4, name: '南北朝' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '敕勒川，阴山下。',
          '天似穹庐，笼盖四野。',
          '天苍苍，野茫茫，风吹草低见牛羊。',
        ],
      },
      {
        id: 904003,
        title: '西洲曲 (节选)',
        author: { id: 9040, name: '南北朝民歌' },
        dynasty: { id: 4, name: '南北朝' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '采莲南塘秋，莲花过人头。',
          '低头弄莲子，莲子清如水。',
          '南风知我意，吹梦到西洲。',
        ],
      },
      {
        id: 904004,
        title: '晚登三山还望京邑',
        author: { id: 9041, name: '谢朓' },
        dynasty: { id: 4, name: '南北朝' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '灞涘望长安，河阳视京县。',
          '余霞散成绮，澄江静如练。',
          '喧鸟覆春洲，杂英满芳甸。',
        ],
      },
      {
        id: 904005,
        title: '登池上楼',
        author: { id: 9042, name: '谢灵运' },
        dynasty: { id: 4, name: '南北朝' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '潜虬媚幽姿，飞鸿响远音。',
          '池塘生春草，园柳变鸣禽。',
        ],
      },
    ],
  },
  {
    id: 9050,
    name: '隋代名篇',
    dynasty: { id: 5, name: '隋' },
    titleBadge: '隋代诗家',
    description: '承前启后的隋代诗风，开唐代近体诗之先声。',
    poemCount: 4,
    poems: [
      {
        id: 905001,
        title: '野望',
        author: { id: 9051, name: '杨广' },
        dynasty: { id: 5, name: '隋' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '寒鸦飞数点，流水绕孤村。',
          '斜阳欲落处，一望黯销魂。',
        ],
      },
      {
        id: 905002,
        title: '从军行',
        author: { id: 9052, name: '卢思道' },
        dynasty: { id: 5, name: '隋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '朔方烽火照甘泉，长安飞将出岱仙。',
          '塞外秋风吹白草，雁门夜月照黄沙。',
        ],
      },
      {
        id: 905003,
        title: '昔昔盐',
        author: { id: 9053, name: '薛道衡' },
        dynasty: { id: 5, name: '隋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '入春才七日，离家已二年。',
          '人归落雁后，思发在花前。',
        ],
      },
    ],
  },

  // ==================== 唐代：李白 · 杜甫 · 白居易 · 王维 · 李商隐 · 杜牧 · 孟浩然 · 柳宗元 · 王勃 ====================
  {
    id: 2045,
    name: '李白',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗仙',
    description: '字太白，号青莲居士，唐代伟大的浪漫主义诗人，与杜甫并称“大李杜”。',
    poemCount: 20,
    poems: [
      {
        id: 309946,
        title: '静夜思',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['床前看月光，疑是地上霜。', '举头望山月，低头思故乡。'],
      },
      {
        id: 310001,
        title: '将进酒',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '君不见黄河之水天上来，奔流到海不复回。',
          '君不见高堂明镜悲白发，朝如青丝暮成雪。',
          '人生得意须尽欢，莫使金樽空对月。',
          '天生我材必有用，千金散尽还复来。',
          '五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。',
        ],
      },
      {
        id: 310002,
        title: '望庐山瀑布',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '日照香炉生紫烟，遥看瀑布挂前川。',
          '飞流直下三千尺，疑是银河落九天。',
        ],
      },
      {
        id: 310003,
        title: '蜀道难',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '噫吁嚱，危乎高哉！蜀道之难，难于上青天！',
          '蚕丛及鱼凫，开国何茫然！',
          '蜀道之难，难于上青天，使人听此凋朱颜！',
        ],
      },
      {
        id: 310004,
        title: '早发白帝城',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '朝辞白帝彩云间，千里江陵一日还。',
          '两岸猿声啼不住，轻舟已过万重山。',
        ],
      },
      {
        id: 310005,
        title: '月下独酌四首 其一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '花间一壶酒，独酌无相亲。',
          '举杯邀明月，对影成三人。',
        ],
      },
      {
        id: 310006,
        title: '行路难三首 其一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '金樽清酒斗十千，玉盘珍羞直万钱。',
          '长风破浪会有时，直挂云帆济沧海。',
        ],
      },
      {
        id: 310008,
        title: '独坐敬亭山',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['众鸟高飞尽，孤云独去闲。', '相看两不厌，只有敬亭山。'],
      },
      {
        id: 310010,
        title: '黄鹤楼送孟浩然之广陵',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '故人西辞黄鹤楼，烟花三月下扬州。',
          '孤帆远影碧空尽，唯见长江天际流。',
        ],
      },
      {
        id: 310011,
        title: '赠汪伦',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '李白乘舟将欲行，忽闻岸上踏歌声。',
          '桃花潭水深千尺，不及汪伦送我情。',
        ],
      },
      {
        id: 310022,
        title: '望天门山',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '天门中断楚江开，碧水东流至此回。',
          '两岸青山相对出，孤帆一片日边来。',
        ],
      },
      {
        id: 310023,
        title: '侠客行',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '赵客缦胡缨，吴钩霜雪明。银鞍照白马，飒沓如流星。',
          '十步杀一人，千里不留行。事了拂衣去，深藏身与名。',
        ],
      },
    ],
  },
  {
    id: 3911,
    name: '杜甫',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗圣',
    description: '字子美，自号少陵野老，唐代伟大的现实主义诗人，其诗沉郁顿挫，悲悯苍生。',
    poemCount: 10,
    poems: [
      {
        id: 343366,
        title: '登高',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '风急天高猿啸哀，渚清沙白鸟飞回。',
          '无边落木萧萧下，不尽长江滚滚来。',
          '万里悲秋常作客，百年多病独登台。',
          '艰难苦恨繁霜鬓，潦倒新停浊酒杯。',
        ],
      },
      {
        id: 343367,
        title: '春望',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '国破山河在，城春草木深。',
          '感时花溅泪，恨别鸟惊心。',
          '烽火连三月，家书抵万金。',
          '白头搔更短，浑欲不胜簪。',
        ],
      },
      {
        id: 343368,
        title: '绝句二首 其一',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['两个黄鹂鸣翠柳，一行白鹭上青天。', '窗含西岭千秋雪，门泊东吴万里船。'],
      },
      {
        id: 343369,
        title: '茅屋为秋风所破歌',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: ['安得广厦千万间，大庇天下寒士俱欢颜！风雨不动安如山。'],
      },
      {
        id: 343370,
        title: '望岳',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: ['岱宗夫如何？齐鲁青未了。', '会当凌绝顶，一览众山小。'],
      },
      {
        id: 343371,
        title: '春夜喜雨',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: ['好雨知时节，当春乃发生。', '随风潜入夜，润物细无声。'],
      },
    ],
  },
  {
    id: 9057,
    name: '白居易',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗魔',
    description: '字乐天，号香山居士，唐代伟大的现实主义诗人。',
    poemCount: 8,
    poems: [
      {
        id: 269310,
        title: '赋得古原草送别',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: ['离离原上草，一岁一枯荣。', '野火烧不尽，春风吹又生。', '远芳侵古道，晴翠接荒城。', '又送王孙去，萋萋满别情。'],
      },
      {
        id: 269311,
        title: '问刘十九',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['绿蚁新醅酒，红泥小火炉。', '晚来天欲雪，能饮一杯无？'],
      },
      {
        id: 269312,
        title: '钱塘湖春行',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: ['孤山寺北贾亭西，水面初平云脚低。', '几处早莺争暖树，谁家新燕啄春泥。', '乱花渐欲迷人眼，浅草才能没马蹄。', '最爱湖东行不足，绿杨阴里白沙堤。'],
      },
      {
        id: 269313,
        title: '大林寺桃花',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['人间四月芳菲尽，山寺桃花始盛开。', '长恨春归无觅处，不知转入此中来。'],
      },
      {
        id: 269314,
        title: '暮江吟',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['一道残阳铺水中，半江瑟瑟半江红。', '可怜九月初三夜，露似真珠月似弓。'],
      },
      {
        id: 269315,
        title: '忆江南·江南好',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 21, name: '五代词' },
        content: ['江南好，风景旧曾谙。', '日出江花红胜火，春来江水绿如蓝。', '能不忆江南？'],
      },
    ],
  },
  {
    id: 7756,
    name: '王维',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗佛',
    description: '字摩诘，号摩诘居士，唐代著名诗人、画家。',
    poemCount: 8,
    poems: [
      {
        id: 300149,
        title: '山居秋暝',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: ['空山新雨后，天气晚来秋。', '明月松间照，清泉石上流。', '竹喧归浣女，莲动下渔舟。', '随意春芳歇，王孙自可留。'],
      },
      {
        id: 300150,
        title: '相思',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['红豆生南国，春来发几枝。', '愿君多采撷，此物最相思。'],
      },
      {
        id: 300151,
        title: '九月九日忆山东兄弟',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['独在异乡为异客，每逢佳节倍思亲。', '遥知兄弟登高处，遍插茱萸少一人。'],
      },
      {
        id: 300152,
        title: '鹿柴',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['空山不见人，但闻人语响。', '返景入深林，复照青苔上。'],
      },
      {
        id: 300153,
        title: '竹里馆',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['独坐幽篁里，弹琴复长啸。', '深林人不知，明月来相照。'],
      },
      {
        id: 300154,
        title: '鸟鸣涧',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['人闲桂花落，夜静春山空。', '月出惊山鸟，时鸣春涧中。'],
      },
      {
        id: 300155,
        title: '使至塞上',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: ['单车欲问边，属国过居延。', '大漠孤烟直，长河落日圆。'],
      },
      {
        id: 300156,
        title: '送元二使安西',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['渭城朝雨浥轻尘，客舍青青柳色新。', '劝君更尽一杯酒，西出阳关无故人。'],
      },
    ],
  },
  {
    id: 5871,
    name: '李商隐',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '玉谿生',
    description: '字义山，号玉谿生，晚唐著名诗人，与杜牧并称“小李杜”。',
    poemCount: 6,
    poems: [
      {
        id: 359601,
        title: '锦瑟',
        author: { id: 5871, name: '李商隐' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '锦瑟无端五十弦，一弦一柱思华年。',
          '庄生晓梦迷蝴蝶，望帝春心托杜鹃。',
          '沧海月明珠有泪，蓝田日暖玉生烟。',
          '此情可待成追忆？只是当时已惘然。',
        ],
      },
      {
        id: 359602,
        title: '夜雨寄北',
        author: { id: 5871, name: '李商隐' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '君问归期未有期，巴山夜雨涨秋池。',
          '何当共剪西窗烛，却话巴山夜雨时。',
        ],
      },
      {
        id: 359603,
        title: '无题·相见时难别亦难',
        author: { id: 5871, name: '李商隐' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '相见时难别亦难，东风无力百花残。',
          '春蚕到死丝方尽，蜡炬成灰泪始干。',
          '晓镜但愁云鬓改，夜吟应觉月光寒。',
          '蓬山此去无多路，青鸟殷勤为探看。',
        ],
      },
      {
        id: 359604,
        title: '无题·昨夜星辰昨夜风',
        author: { id: 5871, name: '李商隐' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '昨夜星辰昨夜风，画楼西畔桂堂东。',
          '身无彩凤双飞翼，心有灵犀一点通。',
        ],
      },
      {
        id: 359605,
        title: '乐游原',
        author: { id: 5871, name: '李商隐' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['向晚意不适，驱车登古原。', '夕阳无限好，只是近黄昏。'],
      },
      {
        id: 359606,
        title: '嫦娥',
        author: { id: 5871, name: '李商隐' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['云母屏风烛影深，长河渐落晓星沉。', '嫦娥应悔偷灵药，碧海青天夜夜心。'],
      },
    ],
  },
  {
    id: 9679,
    name: '杜牧',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '樊川居士',
    description: '字牧之，号樊川居士，晚唐杰出诗人，与李商隐并称“小李杜”。',
    poemCount: 6,
    poems: [
      {
        id: 358701,
        title: '清明',
        author: { id: 9679, name: '杜牧' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['清明时节雨纷纷，路上行人欲断魂。', '借问酒家何处有？牧童遥指杏花村。'],
      },
      {
        id: 358702,
        title: '山行',
        author: { id: 9679, name: '杜牧' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['远上寒山石径斜，白云生处有人家。', '停车坐爱枫林晚，霜叶红于二月花。'],
      },
      {
        id: 358703,
        title: '泊秦淮',
        author: { id: 9679, name: '杜牧' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['烟笼寒水月笼沙，夜泊秦淮近酒家。', '商女不知亡国恨，隔江犹唱后庭花。'],
      },
      {
        id: 358704,
        title: '江南春',
        author: { id: 9679, name: '杜牧' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['千里莺啼绿映红，水村山郭酒旗风。', '南朝四百八十寺，多少楼台烟雨中。'],
      },
      {
        id: 358705,
        title: '赤壁',
        author: { id: 9679, name: '杜牧' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['折戟沉沙铁未销，自将磨洗认前朝。', '东风不与周郎便，铜雀春深锁二乔。'],
      },
      {
        id: 358706,
        title: '过华清宫绝句三首 其一',
        author: { id: 9679, name: '杜牧' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: ['长安回望绣成堆，山顶千门次第开。', '一骑红尘妃子笑，无人知是荔枝来。'],
      },
    ],
  },
  {
    id: 3401,
    name: '孟浩然',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '孟襄阳',
    description: '唐代著名山水田园诗人，与王维并称“王孟”。',
    poemCount: 5,
    poems: [
      {
        id: 340101,
        title: '春晓',
        author: { id: 3401, name: '孟浩然' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['春眠不觉晓，处处闻啼鸟。', '夜来风雨声，花落知多少。'],
      },
      {
        id: 340102,
        title: '宿建德江',
        author: { id: 3401, name: '孟浩然' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['移舟泊烟渚，日暮客愁新。', '野旷天低树，江清月近人。'],
      },
      {
        id: 340103,
        title: '过故人庄',
        author: { id: 3401, name: '孟浩然' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '故人具鸡黍，邀我至田家。',
          '绿树村边合，青山郭外斜。',
          '开轩面场圃，把酒话桑麻。',
          '待到重阳日，还来就菊花。',
        ],
      },
      {
        id: 340104,
        title: '望洞庭湖赠张丞相',
        author: { id: 3401, name: '孟浩然' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '八月湖水平，涵虚混太清。',
          '气蒸云梦泽，波撼岳阳城。',
          '欲济无舟楫，端居耻圣明。',
          '坐观垂钓者，徒有羡鱼情。',
        ],
      },
      {
        id: 340105,
        title: '早寒江上有怀',
        author: { id: 3401, name: '孟浩然' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '木落雁南度，北风江上寒。',
          '我家襄水曲，遥隔楚云端。',
        ],
      },
    ],
  },
  {
    id: 1331,
    name: '柳宗元',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '河东先生',
    description: '字子厚，世称柳河东，“唐宋八大家”之一。',
    poemCount: 4,
    poems: [
      {
        id: 340201,
        title: '江雪',
        author: { id: 1331, name: '柳宗元' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['千山鸟飞绝，万径人踪灭。', '孤舟蓑笠翁，独钓寒江雪。'],
      },
      {
        id: 340202,
        title: '渔翁',
        author: { id: 1331, name: '柳宗元' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: [
          '渔翁夜傍西岩宿，晓汲清湘燃楚竹。',
          '烟销日出不见人，欸乃一声山水绿。',
        ],
      },
      {
        id: 340203,
        title: '溪居',
        author: { id: 1331, name: '柳宗元' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '久为簪组累，幸此南夷谪。',
          '闲依农圃邻，偶似山林客。',
        ],
      },
      {
        id: 340204,
        title: '登柳州城楼寄漳汀封连四州刺史',
        author: { id: 1331, name: '柳宗元' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '城上高楼接大荒，海天愁思正茫茫。',
          '惊风乱飐芙蓉水，密雨斜侵薜荔墙。',
        ],
      },
    ],
  },
  {
    id: 3286,
    name: '王勃',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '初唐四杰之首',
    description: '字子安，“初唐四杰”之首。',
    poemCount: 4,
    poems: [
      {
        id: 340301,
        title: '送杜少府之任蜀州',
        author: { id: 3286, name: '王勃' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '城阙辅三秦，风烟望五津。',
          '与君离别意，同是宦游人。',
          '海内存知己，天涯若比邻。',
          '无为在歧路，儿女共沾巾。',
        ],
      },
      {
        id: 340302,
        title: '滕王阁诗',
        author: { id: 3286, name: '王勃' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '滕王高阁临江渚，佩玉鸣鸾罢歌舞。',
          '画栋朝飞南浦云，珠帘暮卷西山雨。',
          '闲云潭影日悠悠，物换星移几度秋。',
          '阁中帝子今何在？槛外长江空自流。',
        ],
      },
      {
        id: 340303,
        title: '山中',
        author: { id: 3286, name: '王勃' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['长江悲已滞，万里念将归。', '况属高风晚，山山黄叶飞。'],
      },
      {
        id: 340312,
        title: '滕王阁序 (名句)',
        author: { id: 3286, name: '王勃' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 99, name: '其他' },
        content: [
          '落霞与孤鹜齐飞，秋水共长天一色。',
          '老当益壮，宁移白首之心？穷且益坚，不坠青云之志。',
        ],
      },
    ],
  },

  // ==================== 五代：李煜 ====================
  {
    id: 6029,
    name: '李煜',
    dynasty: { id: 7, name: '五代' },
    titleBadge: '词中之帝',
    description: '字重光，南唐末代君主，五代词人集大成者。',
    poemCount: 4,
    poems: [
      {
        id: 905501,
        title: '虞美人·春花秋月何时了',
        author: { id: 6029, name: '李煜' },
        dynasty: { id: 7, name: '五代' },
        type: { id: 21, name: '五代词' },
        content: [
          '春花秋月何时了？往事知多少。小楼昨夜又东风，故国不堪回首月明中。',
          '雕栏玉砌应犹在，只是朱颜改。问君能有几多愁？恰似一江春水向东流。',
        ],
      },
      {
        id: 905502,
        title: '相见欢·无言独上西楼',
        author: { id: 6029, name: '李煜' },
        dynasty: { id: 7, name: '五代' },
        type: { id: 21, name: '五代词' },
        content: [
          '无言独上西楼，月如钩。寂寞梧桐深院锁清秋。',
          '剪不断，理还乱，是离愁。别是一般滋味在心头。',
        ],
      },
      {
        id: 905503,
        title: '浪淘沙令·帘外雨潺潺',
        author: { id: 6029, name: '李煜' },
        dynasty: { id: 7, name: '五代' },
        type: { id: 21, name: '五代词' },
        content: [
          '帘外雨潺潺，春意阑珊。罗衾不耐五更寒。梦里不知身是客，一晌贪欢。',
          '独自莫凭栏，无限江山，别时容易见时难。流水落花春去也，天上人间。',
        ],
      },
    ],
  },

  // ==================== 宋代：苏轼 · 陆游 · 李清照 · 辛弃疾 ====================
  {
    id: 11678,
    name: '苏轼',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '东坡居士',
    description: '字子瞻，号东坡居士，北宋文学家、书画家，“唐宋八大家”之一。',
    poemCount: 10,
    poems: [
      {
        id: 194966,
        title: '水调歌头·明月几时有',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '明月几时有？把酒问青天。不知天上宫阙，今夕是何年。',
          '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。',
          '人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。',
        ],
      },
      {
        id: 194967,
        title: '定风波·莫听穿林打叶声',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。',
          '料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。',
        ],
      },
      {
        id: 194968,
        title: '念奴娇·赤壁怀古',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。',
          '江山如画，一时多少豪杰。人生如梦，一尊还酹江月。',
        ],
      },
      {
        id: 194969,
        title: '饮湖上初晴后雨二首 其二',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '水光潋滟晴方好，山色空蒙雨亦奇。',
          '欲把西湖比西子，淡妆浓抹总相宜。',
        ],
      },
      {
        id: 194970,
        title: '题西林壁',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '横看成岭侧成峰，远近高低各不同。',
          '不识庐山真面目，只缘身在此山中。',
        ],
      },
      {
        id: 194971,
        title: '江城子·乙卯正月二十日夜记梦',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。',
          '相顾无言，惟有泪千行。',
        ],
      },
    ],
  },
  {
    id: 7513,
    name: '陆游',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '放翁',
    description: '字务观，号放翁，南宋著名爱国诗人、词人。',
    poemCount: 8,
    poems: [
      {
        id: 388001,
        title: '示儿',
        author: { id: 7513, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '死去元知万事空，但悲不见九州同。',
          '王师北定中原日，家祭无忘告乃翁。',
        ],
      },
      {
        id: 388002,
        title: '游山西村',
        author: { id: 7513, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '莫笑农家腊酒浑，丰年留客足鸡豚。',
          '山重水复疑无路，柳暗花明又一村。',
          '箫鼓追随春社近，衣冠简朴古风存。',
        ],
      },
      {
        id: 388003,
        title: '钗头凤·红酥手',
        author: { id: 7513, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '红酥手，黄縢酒，满城春色宫墙柳。',
          '东风恶，欢情薄。一怀愁绪，几年离索。错、错、错。',
          '春如旧，人空瘦，泪痕红浥鲛绡透。山盟虽在，锦书难托。莫、莫、莫！',
        ],
      },
      {
        id: 388004,
        title: '卜算子·咏梅',
        author: { id: 7513, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '驿外断桥边，寂寞开无主。',
          '已是黄昏独自愁，更著风和雨。',
          '无意苦争春，一任群芳妒。零落成泥碾作尘，只有香如故。',
        ],
      },
      {
        id: 388006,
        title: '十一月四日风雨大作二首 其二',
        author: { id: 7513, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '僵卧孤村不自哀，尚思为国戍轮台。',
          '夜阑卧听风吹雨，铁马冰河入梦来。',
        ],
      },
      {
        id: 388015,
        title: '书愤五首 其一',
        author: { id: 7513, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '早岁那知世事艰，中原北望气如山。',
          '楼船夜雪瓜洲渡，铁马秋风大散关。',
          '出师一表真名世，千载谁堪伯仲间！',
        ],
      },
    ],
  },
  {
    id: 11433,
    name: '李清照',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '易安居士',
    description: '号易安居士，宋代女词人，婉约词派代表。',
    poemCount: 6,
    poems: [
      {
        id: 245942,
        title: '渔家傲·天接云涛连晓雾',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '天接云涛连晓雾，星河欲转千帆舞。',
          '九万里风鹏正举。风休住，蓬舟吹取三山去！',
        ],
      },
      {
        id: 245943,
        title: '声声慢·寻寻觅觅',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。',
          '这次第，怎一个愁字了得！',
        ],
      },
      {
        id: 245944,
        title: '如梦令·昨夜雨疏风骤',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '昨夜雨疏风骤，浓睡不消残酒。',
          '试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦。',
        ],
      },
      {
        id: 245945,
        title: '如梦令·常记溪亭日暮',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '常记溪亭日暮，沉醉不知归路。兴尽晚回舟，误入藕花深处。',
          '争渡，争渡，惊起一滩鸥鹭。',
        ],
      },
      {
        id: 245946,
        title: '一剪梅·红藕香残玉簟秋',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '花自飘零水自流。一种相思，两处闲愁。',
          '此情无计可消除，才下眉头，却上心头。',
        ],
      },
      {
        id: 245948,
        title: '夏日绝句',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: ['生当作人杰，死亦为鬼雄。', '至今思项羽，不肯过江东。'],
      },
    ],
  },
  {
    id: 8618,
    name: '辛弃疾',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '稼轩居士',
    description: '字幼安，号稼轩，南宋豪放派词人、将领。',
    poemCount: 6,
    poems: [
      {
        id: 71065,
        title: '破阵子·为陈同甫赋壮词以寄之',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '醉里挑灯看剑，梦回吹角连营。',
          '八百里分麾下炙，五十弦翻塞外声。沙场秋点兵。',
          '了却君王天下事，赢得生前身后名。可怜白发生！',
        ],
      },
      {
        id: 71067,
        title: '青玉案·元夕',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '东风夜放花千树。更吹落、星如雨。',
          '众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。',
        ],
      },
      {
        id: 71068,
        title: '永遇乐·京口北固亭怀古',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '千古江山，英雄无觅孙仲谋处。舞榭歌台，风流总被雨打风吹去。',
          '想当年，金戈铁马，气吞万里如虎。凭谁问：廉颇老矣，尚能饭否？',
        ],
      },
      {
        id: 71070,
        title: '丑奴儿·书博山道中壁',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '少年不识愁滋味，爱上层楼。爱上层楼。为赋新词强说愁。',
          '而今识尽愁滋味，欲说还休。欲说还休。却道天凉好个秋。',
        ],
      },
      {
        id: 71071,
        title: '西江月·夜行黄沙道中',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '明月别枝惊鹊，清风半夜鸣蝉。稻花香里说丰年，听取蛙声一片。',
        ],
      },
      {
        id: 71073,
        title: '清平乐·村居',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '茅檐低小，溪上青青草。醉里吴音相媚好，白发谁家翁媪？',
          '最喜小儿亡赖，溪头卧剥莲蓬。',
        ],
      },
    ],
  },

  // ==================== 元代：元曲四大家与散曲精选 ====================
  {
    id: 4799,
    name: '马致远',
    dynasty: { id: 9, name: '元' },
    titleBadge: '曲状元',
    description: '字千里，号东篱，“元曲四大家”之一。',
    poemCount: 5,
    poems: [
      {
        id: 909001,
        title: '天净沙·秋思',
        author: { id: 4799, name: '马致远' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。',
          '夕阳西下，断肠人在天涯。',
        ],
      },
      {
        id: 909002,
        title: '四块玉·恬退',
        author: { id: 4799, name: '马致远' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '酒新淘，鱼旋钓，桥柳阴浓坐清宵。',
          '日头长，官职小，争甚么闲气恼。',
        ],
      },
    ],
  },
  {
    id: 9091,
    name: '张养浩',
    dynasty: { id: 9, name: '元' },
    titleBadge: '散曲名家',
    description: '字希孟，号云庄，元代散曲大家。',
    poemCount: 3,
    poems: [
      {
        id: 909101,
        title: '山坡羊·潼关怀古',
        author: { id: 9091, name: '张养浩' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '峰峦如聚，波涛如怒，山河表里潼关路。',
          '望西都，意踌躇。伤心秦汉经行处，宫阙万间都做了土。',
          '兴，百姓苦；亡，百姓苦。',
        ],
      },
      {
        id: 909102,
        title: '山坡羊·骊山怀古',
        author: { id: 9091, name: '张养浩' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '骊山四顾，阿房一炬，当时奢侈今何处？',
          '只见草萧疏，水萦纡。至今遗恨迷烟树。',
          '赢，都变做了土；输，都变做了土。',
        ],
      },
    ],
  },
  {
    id: 9092,
    name: '关汉卿',
    dynasty: { id: 9, name: '元' },
    titleBadge: '曲圣',
    description: '号已斋叟，“元曲四大家”之首。',
    poemCount: 3,
    poems: [
      {
        id: 909201,
        title: '窦娥冤·滚绣球 (节选)',
        author: { id: 9092, name: '关汉卿' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '有日月朝暮悬，有鬼神掌着生死权。',
          '天地也！只合把清浊分辨，可怎生糊突了盗跖、颜渊？',
          '地也，你不分好歹何为地！天也，你错勘贤愚枉做天！',
        ],
      },
      {
        id: 909202,
        title: '四块玉·别情',
        author: { id: 9092, name: '关汉卿' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '自送别，心难舍，一点相思几时绝？',
          '凭阑袖拂杨花雪。溪又斜，山又遮，人去也！',
        ],
      },
    ],
  },
  {
    id: 9093,
    name: '白朴',
    dynasty: { id: 9, name: '元' },
    titleBadge: '元曲四大家',
    description: '字太素，号兰谷，“元曲四大家”之一。',
    poemCount: 2,
    poems: [
      {
        id: 909301,
        title: '天净沙·秋',
        author: { id: 9093, name: '白朴' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '孤村落日残霞，轻烟老树寒鸦，一点飞鸿影下。',
          '青山绿水，白草红叶黄花。',
        ],
      },
      {
        id: 909302,
        title: '天净沙·春',
        author: { id: 9093, name: '白朴' },
        dynasty: { id: 9, name: '元' },
        type: { id: 30, name: '元曲' },
        content: [
          '春山暖日和风，阑干楼阁帘栊，杨柳秋千院中。',
          '啼莺舞燕，小桥流水飞红。',
        ],
      },
    ],
  },

  // ==================== 清代：纳兰性德 · 龚自珍 · 黄景仁 · 郑燮 · 袁枚 · 赵翼 ====================
  {
    id: 3074,
    name: '纳兰性德',
    dynasty: { id: 10, name: '清' },
    titleBadge: '饮水词人',
    description: '原名成德，字容若，清代著名词人。',
    poemCount: 6,
    poems: [
      {
        id: 910001,
        title: '木兰花·拟古决绝词柬友',
        author: { id: 3074, name: '纳兰性德' },
        dynasty: { id: 10, name: '清' },
        type: { id: 20, name: '宋词' },
        content: [
          '人生若只如初见，何事秋风悲画扇。',
          '等闲变却故人心，却道故人心易变。',
          '骊山语罢清宵半，泪雨零铃终不怨。',
          '何如薄幸锦衣郎，比翼连枝当日愿。',
        ],
      },
      {
        id: 910002,
        title: '长相思·山一程',
        author: { id: 3074, name: '纳兰性德' },
        dynasty: { id: 10, name: '清' },
        type: { id: 20, name: '宋词' },
        content: [
          '山一程，水一程，身向榆关那畔行，夜深千帐灯。',
          '风一更，雪一更，聒碎乡心梦不成，故园无此声。',
        ],
      },
      {
        id: 910003,
        title: '浣溪沙·谁念西风独自凉',
        author: { id: 3074, name: '纳兰性德' },
        dynasty: { id: 10, name: '清' },
        type: { id: 20, name: '宋词' },
        content: [
          '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。',
          '被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。',
        ],
      },
      {
        id: 910004,
        title: '虞美人·秋夕信步',
        author: { id: 3074, name: '纳兰性德' },
        dynasty: { id: 10, name: '清' },
        type: { id: 20, name: '宋词' },
        content: [
          '愁痕满地无人省，露湿琅玕影。',
          '闲阶小立倍荒凉，一片菊香霜月夕阳旁。',
        ],
      },
    ],
  },
  {
    id: 9102,
    name: '龚自珍',
    dynasty: { id: 10, name: '清' },
    titleBadge: '定庵先生',
    description: '清代思想家、文学家。',
    poemCount: 4,
    poems: [
      {
        id: 910201,
        title: '己亥杂诗·其五',
        author: { id: 9102, name: '龚自珍' },
        dynasty: { id: 10, name: '清' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '浩荡离愁白日斜，吟鞭东指即天涯。',
          '落红不是无情物，化作春泥更护花。',
        ],
      },
      {
        id: 910202,
        title: '己亥杂诗·其二百二十',
        author: { id: 9102, name: '龚自珍' },
        dynasty: { id: 10, name: '清' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '九州生气恃风雷，万马齐喑究可哀。',
          '我劝天公重抖擞，不拘一格降人材。',
        ],
      },
    ],
  },
  {
    id: 9103,
    name: '郑燮',
    dynasty: { id: 10, name: '清' },
    titleBadge: '板桥先生',
    description: '字克柔，号板桥，“扬州八怪”之一。',
    poemCount: 2,
    poems: [
      {
        id: 910301,
        title: '竹石',
        author: { id: 9103, name: '郑燮' },
        dynasty: { id: 10, name: '清' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '咬定青山不放松，立根原在破岩中。',
          '千磨万击还坚劲，任尔东西南北风。',
        ],
      },
    ],
  },
  {
    id: 9104,
    name: '袁枚',
    dynasty: { id: 10, name: '清' },
    titleBadge: '简斋',
    description: '字子才，号简斋，世称随园先生。',
    poemCount: 2,
    poems: [
      {
        id: 910401,
        title: '苔',
        author: { id: 9104, name: '袁枚' },
        dynasty: { id: 10, name: '清' },
        type: { id: 11, name: '五言绝句' },
        content: [
          '白日不到处，青春恰自来。',
          '苔花如米小，也学牡丹开。',
        ],
      },
    ],
  },
  {
    id: 9105,
    name: '赵翼',
    dynasty: { id: 10, name: '清' },
    titleBadge: '瓯北先生',
    description: '字云崧，号瓯北，清代著名文学家、史学家。',
    poemCount: 2,
    poems: [
      {
        id: 910501,
        title: '论诗五首 其二',
        author: { id: 9105, name: '赵翼' },
        dynasty: { id: 10, name: '清' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '李杜诗篇万口传，至今已觉不新鲜。',
          '江山代有才人出，各领风骚数百年。',
        ],
      },
    ],
  },

  // ==================== 其他：历代蒙学与古典汇编 ====================
  {
    id: 9990,
    name: '蒙学经典',
    dynasty: { id: 11, name: '其他' },
    titleBadge: '童蒙养正',
    description: '历代启蒙典籍与传世韵文汇编。',
    poemCount: 6,
    poems: [
      {
        id: 999001,
        title: '三字经 (节选)',
        author: { id: 9991, name: '王应麟' },
        dynasty: { id: 11, name: '其他' },
        type: { id: 40, name: '蒙学' },
        content: [
          '人之初，性本善。性相近，习相远。',
          '苟不教，性乃迁。教之道，贵以专。',
          '玉不琢，不成器。人不学，不知义。',
        ],
      },
      {
        id: 999002,
        title: '千字文 (节选)',
        author: { id: 9992, name: '周兴嗣' },
        dynasty: { id: 11, name: '其他' },
        type: { id: 40, name: '蒙学' },
        content: [
          '天地玄黄，宇宙洪荒。日月盈昃，辰宿列张。',
          '寒来暑往，秋收冬藏。闰余成岁，律吕调阳。',
          '云腾致雨，露结为霜。金生丽水，玉出昆冈。',
        ],
      },
      {
        id: 999003,
        title: '笠翁对韵 (一东节选)',
        author: { id: 9993, name: '李渔' },
        dynasty: { id: 11, name: '其他' },
        type: { id: 40, name: '蒙学' },
        content: [
          '天对地，雨对风。大陆对长空。',
          '山花对海树，赤日对苍穹。',
          '雷隐隐，雾蒙蒙。日下对天中。',
          '风高秋月白，雨霁晚霞红。',
        ],
      },
      {
        id: 999004,
        title: '声律启蒙 (一东节选)',
        author: { id: 9994, name: '车万育' },
        dynasty: { id: 11, name: '其他' },
        type: { id: 40, name: '蒙学' },
        content: [
          '云对雨，雪对风，晚照对晴空。',
          '来鸿对去燕，宿鸟对鸣虫。',
          '三尺剑，六钧弓，岭北对江东。',
          '人间清暑殿，天上广寒宫。',
        ],
      },
    ],
  },
];

/**
 * Find poet by name
 */
export function findPoetByName(name: string): FamousPoetProfile | undefined {
  if (!name) return undefined;
  const clean = name.trim().toLowerCase();
  return FAMOUS_POETS_DIRECTORY.find(
    (p) => p.name.toLowerCase() === clean || p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase())
  );
}

/**
 * Find poem by ID across all directory profiles
 */
export function findPoemById(id: number | string): Poem | undefined {
  const numId = Number(id);
  for (const poet of FAMOUS_POETS_DIRECTORY) {
    const found = poet.poems?.find((p) => p.id === numId);
    if (found) return found;
  }
  return undefined;
}

/**
 * Filter poems by combined criteria (dynasty, type, author)
 */
export function filterPoemsByCriteria(
  dynasty?: string,
  type?: string,
  author?: string,
  page = 1,
  pageSize = 20
): {
  poems: Poem[];
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
} {
  let list: Poem[] = [];

  // 1. Author Filter
  if (author) {
    const cleanAuthor = author.trim().toLowerCase();
    const matchedPoet = findPoetByName(author);
    if (matchedPoet && matchedPoet.poems) {
      list = [...matchedPoet.poems];
    } else {
      for (const poet of FAMOUS_POETS_DIRECTORY) {
        if (poet.name.toLowerCase().includes(cleanAuthor)) {
          list.push(...poet.poems);
        }
      }
    }
  } else {
    // Gather all
    for (const poet of FAMOUS_POETS_DIRECTORY) {
      list.push(...poet.poems);
    }
  }

  // 2. Dynasty Filter
  if (dynasty) {
    list = list.filter((p) => p.dynasty?.name === dynasty);
  }

  // 3. Type Filter
  if (type) {
    if (type === '唐诗') {
      list = list.filter((p) => p.dynasty?.name === '唐');
    } else if (type === '宋词' || type === '五代词') {
      list = list.filter((p) => p.type?.name?.includes('词') || p.type?.name === type);
    } else {
      list = list.filter((p) => p.type?.name === type);
    }
  }

  const totalCount = list.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const poems = list.slice(startIndex, endIndex);

  return {
    poems,
    totalCount,
    totalPages,
    hasMore: page < totalPages,
  };
}

/**
 * Filter authors by dynasty and query
 */
export function filterAuthorsByCriteria(
  dynasty?: string,
  q?: string,
  page = 1,
  pageSize = 20
): {
  authors: Author[];
  totalCount: number;
  hasMore: boolean;
} {
  let list: Author[] = [...FAMOUS_POETS_DIRECTORY];

  if (dynasty) {
    list = list.filter((a) => a.dynasty?.name === dynasty);
  }

  if (q) {
    const cleanQ = q.trim().toLowerCase();
    list = list.filter((a) => a.name.toLowerCase().includes(cleanQ));
  }

  const totalCount = list.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const authors = list.slice(startIndex, endIndex);

  return {
    authors,
    totalCount,
    hasMore: endIndex < totalCount,
  };
}

/**
 * Get poet's poems with real pagination support
 */
export function getPoetPoems(authorName: string, page = 1, pageSize = 20): {
  poems: Poem[];
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
} {
  return filterPoemsByCriteria(undefined, undefined, authorName, page, pageSize);
}
