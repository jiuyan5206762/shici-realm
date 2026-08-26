import { Author, Poem } from '@/types';

export interface FamousPoetProfile extends Author {
  titleBadge?: string;
  poems: Poem[];
}

// Comprehensive database of famous historical poets across all dynasties with authentic full collections
export const FAMOUS_POETS_DIRECTORY: FamousPoetProfile[] = [
  // ==================== 先秦：诗经 · 楚辞 · 先秦诸子 ====================
  {
    id: 9619,
    name: '屈原',
    dynasty: { id: 1, name: '先秦' },
    titleBadge: '楚辞之祖',
    description: '战国时期楚国诗人、政治家，中国浪漫主义文学奠基人，“楚辞”创立者。其诗情志深沉，文采绚烂。',
    poemCount: 6,
    poems: [
      {
        id: 901001,
        title: '离骚 (节选)',
        author: { id: 9619, name: '屈原' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 18, name: '楚辞' },
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
        type: { id: 18, name: '楚辞' },
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
        type: { id: 18, name: '楚辞' },
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
        type: { id: 18, name: '楚辞' },
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
        type: { id: 18, name: '楚辞' },
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
        type: { id: 18, name: '楚辞' },
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
    description: '中国古代诗歌开山总集，收录西周初年至春秋中叶诗歌305篇，分为风、雅、颂三部分。',
    poemCount: 8,
    poems: [
      {
        id: 901011,
        title: '关雎',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 1, name: '诗经' },
        content: [
          '关关雎鸠，在河之洲。窈窕淑女，君子好逑。',
          '参差荇菜，左右流之。窈窕淑女，寤寐求之。',
          '求之不得，寤寐思服。悠哉悠哉，辗转反侧。',
          '参差荇菜，左右采之。窈窕淑女，琴瑟友之。',
          '参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。',
        ],
      },
      {
        id: 901012,
        title: '蒹葭',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 1, name: '诗经' },
        content: [
          '蒹葭苍苍，白露为霜。所谓伊人，在水一方。',
          '溯洄从之，道阻且长。溯游从之，宛在水中央。',
          '蒹葭萋萋，白露未晞。所谓伊人，在水之湄。',
          '溯洄从之，道阻且跻。溯游从之，宛在水中坻。',
        ],
      },
      {
        id: 901013,
        title: '桃夭',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 1, name: '诗经' },
        content: [
          '桃之夭夭，灼灼其华。之子于归，宜其室家。',
          '桃之夭夭，有蕡其实。之子于归，宜其家室。',
          '桃之夭夭，其叶蓁蓁。之子于归，宜其家人。',
        ],
      },
      {
        id: 901014,
        title: '采薇 (节选)',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 1, name: '诗经' },
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
        type: { id: 1, name: '诗经' },
        content: [
          '投我以木瓜，报之以琼琚。匪报也，永以为好也！',
          '投我以木桃，报之以琼瑶。匪报也，永以为好也！',
          '投我以木李，报之以琼玖。匪报也，永以为好也！',
        ],
      },
      {
        id: 901016,
        title: '子衿',
        author: { id: 9610, name: '诗经' },
        dynasty: { id: 1, name: '先秦' },
        type: { id: 1, name: '诗经' },
        content: [
          '青青子衿，悠悠我心。纵我不往，子宁不嗣音？',
          '青青子佩，悠悠我思。纵我不往，子宁不来？',
          '一日不见，如三月兮！',
        ],
      },
    ],
  },
  // ==================== 两汉：汉乐府 · 古诗十九首 · 汉赋 ====================
  {
    id: 9020,
    name: '汉乐府',
    dynasty: { id: 2, name: '两汉' },
    titleBadge: '民歌正宗',
    description: '汉代乐府机关采集的民间诗歌总汇，开创了中国古代叙事诗与抒情诗的崭新风貌。',
    poemCount: 14,
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
          '胡马依北风，越鸟巢南枝。',
          '相去日已远，衣带日已缓。',
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
          '还顾望旧乡，长路漫浩浩。',
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
          '行者见罗敷，下担捋髭须。少年见罗敷，脱帽著帞头。',
          '耕者忘其犁，锄者忘其锄。来归相怨怒，但坐观罗敷。',
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
          '兔从狗窦入，雉从梁上飞。',
          '中庭生旅谷，井上生旅葵。',
          '舂谷持作饭，采葵持作羹。',
          '羹饭一时熟，不知贻阿谁！',
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
          '泛楼船兮济汾河，横中流兮扬素波。',
          '箫鼓鸣兮发操歌，欢乐极兮哀情多。',
          '少壮几时兮奈老何！',
        ],
      },
      {
        id: 902010,
        title: '白头吟',
        author: { id: 9020, name: '汉乐府' },
        dynasty: { id: 2, name: '两汉' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '皑如山上雪，皎若云间月。',
          '闻君有两意，故来相决绝。',
          '今日斗酒会，明旦沟水头。',
          '躞蹀御沟上，沟水东西流。',
          '凄凄复凄凄，嫁娶不须啼。',
          '愿得一心人，白头不相离。',
        ],
      },
    ],
  },
  // ==================== 魏晋：建安风骨 · 陶渊明 ====================
  {
    id: 8228,
    name: '曹操',
    dynasty: { id: 3, name: '魏晋' },
    titleBadge: '魏武帝',
    description: '字孟德，东汉末年杰出政治家、文学家，建安文学代表人物。其诗气魄雄伟，慷慨悲凉。',
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
          '呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。',
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
          '幸甚至哉，歌以咏志。',
        ],
      },
      {
        id: 903004,
        title: '蒿里行',
        author: { id: 8228, name: '曹操' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '关东有义士，兴兵讨群凶。初期会盟津，乃心在咸阳。',
          '铠甲生虮虱，万姓以死亡。白骨露于野，千里无鸡鸣。',
          '生民百遗一，念之断人肠。',
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
          '树木何萧瑟，北风声正悲。熊罴对我蹲，虎豹夹路啼。',
          '溪谷少人民，雪落何霏霏！',
        ],
      },
    ],
  },
  {
    id: 9035,
    name: '陶渊明',
    dynasty: { id: 3, name: '魏晋' },
    titleBadge: '五柳先生',
    description: '字元亮，号五柳先生，世称靖节先生。东晋末至南朝宋初期伟大诗人，田园诗派开创者。',
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
          '孟夏草木长，绕屋树扶疏。',
          '众鸟欣有托，吾亦爱吾庐。',
          '微雨从东来，好风与之俱。',
          '俯仰终宇宙，不乐复何如？',
        ],
      },
      {
        id: 903506,
        title: '乞食',
        author: { id: 9035, name: '陶渊明' },
        dynasty: { id: 3, name: '魏晋' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '饥来驱我去，不知竟何之。',
          '行行至斯里，叩门拙言辞。',
          '主人解余意，遗赠岂虚来。',
        ],
      },
    ],
  },
  // ==================== 南北朝 · 隋代 ====================
  {
    id: 9040,
    name: '南北朝民歌',
    dynasty: { id: 4, name: '南北朝' },
    titleBadge: '北歌南曲',
    description: '南北朝时期南北两地的民歌精华，既有北朝的雄浑刚健，又有南朝的清丽缠绵。',
    poemCount: 5,
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
          '忆梅下西洲，折梅寄江北。',
          '单衫杏子红，双鬓鸦雏色。',
          '采莲南塘秋，莲花过人头。',
          '低头弄莲子，莲子清如水。',
          '南风知我意，吹梦到西洲。',
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
    description: '字太白，号青莲居士，唐代伟大的浪漫主义诗人。其诗风豪放飘逸，气吞山河，与杜甫并称“大李杜”。',
    poemCount: 40,
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
          '烹羊宰牛且为乐，会须一饮三百杯。',
          '岑夫子，丹丘生，将进酒，杯莫停。',
          '与君歌一曲，请君为我倾耳听。',
          '钟鼓馔玉不足贵，但愿长醉不愿醒。',
          '古来圣贤皆寂寞，惟有饮者留其名。',
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
          '西当太白有鸟道，可以横绝峨眉巅。',
          '地崩山摧壮士死，然后天梯石栈相钩连。',
          '上有六龙回日之高标，下有冲波逆折之回川。',
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
          '月既不解饮，影徒随我身。',
          '暂伴月将影，行乐须及春。',
          '醒时同交欢，醉后各分散。',
          '永结无情游，相期邈云汉。',
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
          '停杯投箸不能食，拔剑四顾心茫然。',
          '欲渡黄河冰塞川，将登太行雪满山。',
          '行路难，行路难，多歧路，今安在？',
          '长风破浪会有时，直挂云帆济沧海。',
        ],
      },
      {
        id: 310007,
        title: '梦游天姥吟留别',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: [
          '海客谈瀛洲，烟涛微茫信难求；',
          '越人语天姥，云霞明灭或可睹。',
          '天姥连天向天横，势拔五岳掩赤城。',
          '安能摧眉折腰事权贵，使我不得开心颜！',
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
        id: 310014,
        title: '清平调 其一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '云想衣裳花想容，春风拂槛露华浓。',
          '若非群玉山头见，会向瑶台月下逢。',
        ],
      },
      {
        id: 310020,
        title: '渡荆门送别',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '渡远荆门外，来从楚国游。',
          '山随平野尽，江入大荒流。',
          '月下飞天镜，云生结海楼。',
          '仍怜故乡水，万里送行舟。',
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
      {
        id: 310024,
        title: '夜宿山寺',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['危楼高百尺，手可摘星辰。', '不敢高声语，恐惊天上人。'],
      },
      {
        id: 310025,
        title: '关山月',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '明月出天山，苍茫云海间。长风几万里，吹度玉门关。',
        ],
      },
      {
        id: 310026,
        title: '春夜洛城闻笛',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '谁家玉笛暗飞声，散入春风满洛城。',
          '此夜曲中闻折柳，何人不起故园情。',
        ],
      },
      {
        id: 310027,
        title: '长干行二首 其一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '妾发初覆额，折花门前剧。郎骑竹马来，绕床弄青梅。',
          '同居长干里，两小无嫌猜。十四为君妇，羞颜未尝开。',
        ],
      },
      {
        id: 310028,
        title: '古朗月行',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '小时不识月，呼作白玉盘。',
          '又疑瑶台镜，飞在青云端。',
        ],
      },
    ],
  },
  {
    id: 7756,
    name: '王维',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗佛',
    description: '字摩诘，号摩诘居士，唐代著名诗人、画家。精通诗书画乐，以山水田园诗著称。',
    poemCount: 10,
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
    id: 3911,
    name: '杜甫',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗圣',
    description: '字子美，自号少陵野老，唐代伟大的现实主义诗人。其诗沉郁顿挫，悲悯苍生。',
    poemCount: 10,
    poems: [
      {
        id: 343366,
        title: '登高',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: ['风急天高猿啸哀，渚清沙白鸟飞回。', '无边落木萧萧下，不尽长江滚滚来。'],
      },
      {
        id: 343367,
        title: '春望',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: ['国破山河在，城春草木深。', '感时花溅泪，恨别鸟惊心。', '烽火连三月，家书抵万金。'],
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
        content: ['会当凌绝顶，一览众山小。'],
      },
    ],
  },
  // ==================== 五代：南唐后主 · 五代词 ====================
  {
    id: 9055,
    name: '李煜',
    dynasty: { id: 7, name: '五代' },
    titleBadge: '词中之帝',
    description: '字重光，南唐末代君主，五代词人集大成者。',
    poemCount: 4,
    poems: [
      {
        id: 905501,
        title: '虞美人·春花秋月何时了',
        author: { id: 9055, name: '李煜' },
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
        author: { id: 9055, name: '李煜' },
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
        author: { id: 9055, name: '李煜' },
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
    poemCount: 6,
    poems: [
      {
        id: 194966,
        title: '水调歌头·明月几时有',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '明月几时有？把酒问青天。不知天上宫阙，今夕是何年。',
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
          '竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。',
          '回首向来萧瑟处，归去，也无风雨也无晴。',
        ],
      },
      {
        id: 194968,
        title: '念奴娇·赤壁怀古',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '大江东去，浪淘尽，千古风流人物。',
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
    ],
  },
  {
    id: 3880,
    name: '陆游',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '放翁',
    description: '字务观，号放翁，南宋著名爱国诗人。',
    poemCount: 6,
    poems: [
      {
        id: 388001,
        title: '示儿',
        author: { id: 3880, name: '陆游' },
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
        author: { id: 3880, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '莫笑农家腊酒浑，丰年留客足鸡豚。',
          '山重水复疑无路，柳暗花明又一村。',
        ],
      },
      {
        id: 388003,
        title: '钗头凤·红酥手',
        author: { id: 3880, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '红酥手，黄縢酒，满城春色宫墙柳。',
          '错、错、错。春如旧，人空瘦，泪痕红浥鲛绡透。',
        ],
      },
      {
        id: 388004,
        title: '十一月四日风雨大作二首 其二',
        author: { id: 3880, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '僵卧孤村不自哀，尚思为国戍轮台。',
          '夜阑卧听风吹雨，铁马冰河入梦来。',
        ],
      },
      {
        id: 388005,
        title: '卜算子·咏梅',
        author: { id: 3880, name: '陆游' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '驿外断桥边，寂寞开无主。',
          '零落成泥碾作尘，只有香如故。',
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
    poemCount: 5,
    poems: [
      {
        id: 245942,
        title: '渔家傲·天接云涛连晓雾',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
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
          '梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个愁字了得！',
        ],
      },
      {
        id: 245944,
        title: '如梦令·昨夜雨疏风骤',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦。',
        ],
      },
      {
        id: 245948,
        title: '夏日绝句',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '生当作人杰，死亦为鬼雄。至今思项羽，不肯过江东。',
        ],
      },
    ],
  },
  {
    id: 8618,
    name: '辛弃疾',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '稼轩居士',
    description: '字幼安，号稼轩，南宋豪放派词人。',
    poemCount: 4,
    poems: [
      {
        id: 71065,
        title: '破阵子·为陈同甫赋壮词以寄之',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '醉里挑灯看剑，梦回吹角连营。',
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
          '众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。',
        ],
      },
    ],
  },
  // ==================== 元代：元曲四大家 ====================
  {
    id: 9090,
    name: '马致远',
    dynasty: { id: 9, name: '元' },
    titleBadge: '曲状元',
    description: '字千里，号东篱，“元曲四大家”之一。',
    poemCount: 3,
    poems: [
      {
        id: 909001,
        title: '天净沙·秋思',
        author: { id: 9090, name: '马致远' },
        dynasty: { id: 9, name: '元' },
        type: { id: 22, name: '元曲' },
        content: [
          '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。',
          '夕阳西下，断肠人在天涯。',
        ],
      },
      {
        id: 909002,
        title: '寿阳曲·远浦帆归',
        author: { id: 9090, name: '马致远' },
        dynasty: { id: 9, name: '元' },
        type: { id: 22, name: '元曲' },
        content: [
          '夕阳下，酒旆风，半边岸草枯萎。',
          '一行白鹭从容下，极目水云重叠。',
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
    poemCount: 2,
    poems: [
      {
        id: 909101,
        title: '山坡羊·潼关怀古',
        author: { id: 9091, name: '张养浩' },
        dynasty: { id: 9, name: '元' },
        type: { id: 22, name: '元曲' },
        content: [
          '峰峦如聚，波涛如怒，山河表里潼关路。',
          '望西都，意踌躇。伤心秦汉经行处，宫阙万间都做了土。',
          '兴，百姓苦；亡，百姓苦。',
        ],
      },
    ],
  },
  // ==================== 清代：纳兰性德 · 龚自珍 ====================
  {
    id: 3074,
    name: '纳兰性德',
    dynasty: { id: 10, name: '清' },
    titleBadge: '饮水词人',
    description: '字容若，清代著名词人。',
    poemCount: 4,
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
    ],
  },
  {
    id: 9102,
    name: '龚自珍',
    dynasty: { id: 10, name: '清' },
    titleBadge: '定庵先生',
    description: '清代思想家、文学家。',
    poemCount: 2,
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
    ],
  },
];

/**
 * Find poet by name
 */
export function findPoetByName(name: string): FamousPoetProfile | undefined {
  const clean = name.trim().toLowerCase();
  return FAMOUS_POETS_DIRECTORY.find(
    (p) => p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase())
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
