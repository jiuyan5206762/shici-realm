import { Author, Poem } from '@/types';

export interface FamousPoetProfile extends Author {
  titleBadge?: string;
  poems: Poem[];
}

// Comprehensive database of famous poets with full poems library for multi-page pagination
export const FAMOUS_POETS_DIRECTORY: FamousPoetProfile[] = [
  {
    id: 2045,
    name: '李白',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗仙',
    description: '字太白，号青莲居士，唐代伟大的浪漫主义诗人。其诗风豪放飘逸，气吞山河，意境深邃奇崛，与杜甫并称“大李杜”。',
    poemCount: 1000,
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
          '陈王昔时宴平乐，斗酒十千恣欢谑。',
          '主人何为言少钱，径须沽取对君酌。',
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
          '尔来四万八千岁，不与秦塞通人烟。',
          '西当太白有鸟道，可以横绝峨眉巅。',
          '地崩山摧壮士死，然后天梯石栈相钩连。',
          '上有六龙回日之高标，下有冲波逆折之回川。',
          '黄鹤之飞尚不得过，猿猱欲度愁攀援。',
          '青泥何盘盘，百步九折萦岩峦。',
          '扪参历井仰胁息，以手抚膺坐长叹。',
          '问君西游何时还？畏途巉岩不可攀。',
          '但见悲鸟号古木，雄飞雌从绕林间。',
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
          '我歌月徘徊，我舞影零乱。',
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
          '闲来垂钓碧溪上，忽复乘舟梦日边。',
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
          '天台四万八千丈，对此欲倒东南倾。',
          '我欲因之梦吴越，一夜飞度镜湖月。',
          '湖月照我影，送我至剡溪。',
          '谢公宿处今尚在，渌水荡漾清猿啼。',
          '脚著谢公屐，身登青云梯。',
          '半壁见海日，空中闻天鸡。',
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
        id: 310009,
        title: '侠客行',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '赵客缦胡缨，吴钩霜雪明。',
          '银鞍照白马，飒沓如流星。',
          '十步杀一人，千里不留行。',
          '事了拂衣去，深藏身与名。',
          '闲过临淄市，脱剑膝前横。',
          '纵死侠骨香，不惭世上英。',
        ],
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
        id: 310012,
        title: '秋浦歌十七首 十七',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['桃波一步地，了了语声闻。', '暗与山僧别，低头礼白云。'],
      },
      {
        id: 310013,
        title: '宣州谢朓楼饯别校书叔云',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: [
          '弃我去者，昨日之日不可留；',
          '乱我心者，今日之日多烦忧。',
          '长风万里送秋雁，对此可以酣高楼。',
          '蓬莱文章建安骨，中间小谢又清发。',
          '俱怀逸兴壮思飞，欲上青天揽明月。',
          '抽刀断水水更流，举杯消愁愁更愁。',
          '人生在世不称意，明朝散发弄扁舟。',
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
        id: 310015,
        title: '清平调 其二',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '一枝红艳露凝香，云雨巫山枉断肠。',
          '借问汉宫谁得似，可怜飞燕倚新妆。',
        ],
      },
      {
        id: 310016,
        title: '清平调 其三',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '名花倾国两相欢，长得君王带笑看。',
          '解释春风无限恨，沉香亭北倚阑干。',
        ],
      },
      {
        id: 310017,
        title: '关山月',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '明月出天山，苍茫云海间。',
          '长风几万里，吹度玉门关。',
          '汉下白登道，胡窥青海湾。',
          '由来征战地，不见有人还。',
          '戍客望边邑，思归多苦颜。',
          '高楼当此夜，叹息未应闲。',
        ],
      },
      {
        id: 310018,
        title: '长干行 其一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '妾发初覆额，折花门前剧。',
          '郎骑竹马来，绕床弄青梅。',
          '同居长干里，两小无嫌猜。',
          '十四为君妇，羞颜未尝开。',
          '低头向暗壁，千唤不一回。',
          '十五始展眉，愿同尘与灰。',
        ],
      },
      {
        id: 310019,
        title: '登金陵凤凰台',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '凤凰台上凤凰游，凤去台空江自流。',
          '吴宫花草埋幽径，晋代衣冠成古丘。',
          '三山半落青天外，二水中分白鹭洲。',
          '总为浮云能蔽日，长安不见使人愁。',
        ],
      },
      // --- Page 2 items for Li Bai ---
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
        id: 310021,
        title: '峨眉山月歌',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '峨眉山月半轮秋，影入平羌江水流。',
          '夜发清溪向三峡，思君不见下渝州。',
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
        title: '把酒问月',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: [
          '青天有月来几时？我今停杯一问之。',
          '人攀明月不可得，月行却与人相随。',
          '皎如飞镜临丹阙，绿烟灭尽清辉发。',
          '但见宵从海上来，宁知晓向云间没？',
          '白兔捣药秋复春，嫦娥孤栖与谁邻？',
          '今人不见古时月，今月曾经照古人。',
        ],
      },
      {
        id: 310024,
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
        id: 310025,
        title: '访戴天山道士不遇',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '犬吠水声中，桃花带露浓。',
          '树深时见鹿，溪午不闻钟。',
          '野竹分青霭，飞泉挂碧峰。',
          '无人知所去，愁倚两三松。',
        ],
      },
      {
        id: 310026,
        title: '赠孟浩然',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '吾爱孟夫子，风流天下闻。',
          '红颜弃轩冕，白首卧松云。',
          '醉月频中圣，迷花不事君。',
          '高山安可仰，徒此揖清芬。',
        ],
      },
      {
        id: 310027,
        title: '听蜀僧濬弹琴',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '蜀僧抱绿绮，西下峨眉峰。',
          '为我一挥手，如听万壑松。',
          '客心洗流水，余响入霜钟。',
          '不觉碧山暮，秋云暗几重。',
        ],
      },
      {
        id: 310028,
        title: '玉阶怨',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['玉阶生白露，夜久侵罗袜。', '却下水晶帘，玲珑望秋月。'],
      },
      {
        id: 310029,
        title: '古朗月行',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '小时不识月，呼作白玉盘。',
          '又疑瑶台镜，飞在青云端。',
          '仙人垂两足，桂树何团团。',
          '白兔捣药成，问言与谁餐？',
        ],
      },
      {
        id: 310030,
        title: '送友人',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '青山横北郭，白水绕东城。',
          '此地一为别，孤蓬万里征。',
          '浮云游子意，落日故人情。',
          '挥手自兹去，萧萧班马鸣。',
        ],
      },
      {
        id: 310031,
        title: '秋浦歌十七首 十四',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['炉火照天地，红星乱紫烟。', '赧郎明月夜，歌曲动寒川。'],
      },
      {
        id: 310032,
        title: '秋浦歌十七首 十五',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: ['白发三千丈，缘愁似个长。', '不知明镜里，何处得秋霜。'],
      },
      {
        id: 310033,
        title: '塞下曲六首 其一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '五月天山雪，无花只有寒。',
          '笛中闻折柳，春色未曾看。',
          '晓战随金鼓，宵眠抱玉鞍。',
          '愿将腰下剑，直为斩楼兰。',
        ],
      },
      {
        id: 310034,
        title: '塞下曲六首 其三',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '骏马似风飙，鸣鞭出渭桥。',
          '弯弓辞汉月，插羽破天骄。',
        ],
      },
      {
        id: 310707,
        title: '代美人愁镜二首 一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '明明金鹊镜，了了玉台前。',
          '拂拭交冰月，光辉何清圆。',
          '红颜老昨日，白发多去年。',
          '铅粉坐相误，照来空凄然。',
        ],
      },
      {
        id: 340847,
        title: '与诸公送陈郎将归衡阳',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: [
          '衡山苍苍入紫冥，下看南极老人星。',
          '回飙吹散五峰雪，门前食客乱浮云。',
        ],
      },
      {
        id: 310035,
        title: '白纻辞三首 二',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '月寒江清夜沉沉，美人一笑千黄金。',
          '垂罗舞縠扬哀音，郢中白雪且莫吟。',
          '子夜吴歌动君心，动君心，冀君赏。',
          '愿作天池双鸳鸯，一朝飞去青云上。',
        ],
      },
      {
        id: 310036,
        title: '古风五十九首 其一',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '大雅久不作，吾衰竟谁陈？',
          '王风委蔓草，战国多荆榛。',
          '龙虎相纠缠，战争到底频。',
          '正声何微茫，哀怨起骚人。',
        ],
      },
      {
        id: 310037,
        title: '宿五松山下荀媪家',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '我宿五松下，寂寥无所欢。',
          '田家秋作苦，邻女夜舂寒。',
          '跪进雕胡饭，月光明素盘。',
          '令人惭漂母，三谢不能餐。',
        ],
      },
      // --- Page 3 items for Li Bai ---
      {
        id: 310038,
        title: '陪侍御叔华登楼歌',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: [
          '昨夜西风凋碧树，独上高楼，望尽天涯路。',
          '欲寄彩笺兼尺素，山长水阔知何处。',
        ],
      },
      {
        id: 310039,
        title: '结客少年场行',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 17, name: '乐府诗' },
        content: [
          '紫燕黄金瞳，兜鍪青丝络。',
          '霜蹄白如玉，跃马入金洛。',
          '朝游茂陵道，暮宿昆仑峰。',
        ],
      },
      {
        id: 310040,
        title: '怨歌行',
        author: { id: 2045, name: '李白' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '十五入汉宫，花颜笑春红。',
          '君王选玉色，侍寝金屏中。',
          '承恩乐未穷，妾心如日月。',
        ],
      },
    ],
  },
  {
    id: 3911,
    name: '杜甫',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗圣',
    description: '字子美，自号少陵野老，唐代伟大的现实主义诗人。其诗沉郁顿挫，悲悯苍生，深刻反映了唐代历史风貌，被誉为“诗史”。',
    poemCount: 1400,
    poems: [
      {
        id: 343365,
        title: '巴西驿亭观江涨，呈窦使君',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: ['宿雨清秋霁，凭轩望大川。', '波涛发洞壑，风水助云烟。'],
      },
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
        content: [
          '两个黄鹂鸣翠柳，一行白鹭上青天。',
          '窗含西岭千秋雪，门泊东吴万里船。',
        ],
      },
      {
        id: 343369,
        title: '茅屋为秋风所破歌',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 16, name: '七言古诗' },
        content: [
          '八月秋高风怒号，卷我屋上三重茅。',
          '安得广厦千万间，大庇天下寒士俱欢颜！风雨不动安如山。',
          '呜呼！何时眼前突兀见此屋，吾庐独破受冻死亦足！',
        ],
      },
      {
        id: 343370,
        title: '闻官军收河南河北',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '剑外忽传收蓟北，初闻涕泪满衣裳。',
          '却看妻子愁何在，漫卷诗书喜欲狂。',
          '白日放歌须纵酒，青春作伴好还乡。',
          '即从巴峡穿巫峡，便下襄阳向洛阳。',
        ],
      },
      {
        id: 343371,
        title: '望岳',
        author: { id: 3911, name: '杜甫' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 15, name: '五言古诗' },
        content: [
          '岱宗夫如何？齐鲁青未了。',
          '造化钟神秀，阴阳割昏晓。',
          '荡胸生曾云，决眦入归鸟。',
          '会当凌绝顶，一览众山小。',
        ],
      },
    ],
  },
  {
    id: 11678,
    name: '苏轼',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '东坡居士',
    description: '字子瞻，号东坡居士，世称苏东坡。北宋文学家、书画家，“唐宋八大家”之一，豪放词派开创者。',
    poemCount: 2700,
    poems: [
      {
        id: 194965,
        title: '题王维画',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: ['味摩诘之诗，诗中有画；', '观摩诘之画，画中有诗。'],
      },
      {
        id: 194966,
        title: '水调歌头·明月几时有',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '明月几时有？把酒问青天。',
          '不知天上宫阙，今夕是何年。',
          '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。',
          '起舞弄清影，何似在人间。',
          '转朱阁，低绮户，照无眠。',
          '不应有恨，何事长向别时圆？',
          '人有悲欢离合，月有阴晴圆缺，此事古难全。',
          '但愿人长久，千里共婵娟。',
        ],
      },
      {
        id: 194967,
        title: '定风波·莫听穿林打叶声',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '莫听穿林打叶声，何妨吟啸且徐行。',
          '竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。',
          '料峭春风吹酒醒，微冷，山头斜照却相迎。',
          '回首向来萧瑟处，归去，也无风雨也无晴。',
        ],
      },
      {
        id: 194968,
        title: '江城子·乙卯正月二十日夜记梦',
        author: { id: 11678, name: '苏轼' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '十年生死两茫茫，不思量，自难忘。',
          '千里孤坟，无处话凄凉。',
          '纵使相逢应不识，尘满面，鬓如霜。',
          '夜来幽梦忽还乡，小轩窗，正梳妆。',
          '相顾无言，惟有泪千行。',
          '料得年年肠断处，明月夜，短松冈。',
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
    id: 11433,
    name: '李清照',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '易安居士',
    description: '号易安居士，宋代女词人，婉约词派代表，有“千古第一才女”之称。其词前期清丽明快，后期深沉哀婉。',
    poemCount: 80,
    poems: [
      {
        id: 245942,
        title: '渔家傲·天接云涛连晓雾',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '天接云涛连晓雾，星河欲转千帆舞。',
          '仿佛梦魂归帝所。闻天语，殷勤问我归何处。',
          '我报路长嗟日暮，学诗谩有惊人句。',
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
          '乍暖还寒时候，最难将息。',
          '三杯两盏淡酒，怎敌他、晚来风急！',
          '雁过也，正伤心，却是旧时相识。',
          '满地黄花堆积，憔悴损，如今有谁堪摘？',
          '守着窗儿，独自怎生得黑！',
          '梧桐更兼细雨，到黄昏、点点滴滴。',
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
          '试问卷帘人，却道海棠依旧。',
          '知否，知否？应是绿肥红瘦。',
        ],
      },
      {
        id: 245945,
        title: '一剪梅·红藕香残玉簟秋',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '红藕香残玉簟秋。轻解罗裳，独上兰舟。',
          '云中谁寄锦书来？雁字回时，月满西楼。',
          '花自飘零水自流。一种相思，两处闲愁。',
          '此情无计可消除，才下眉头，却上心头。',
        ],
      },
      {
        id: 245946,
        title: '夏日绝句',
        author: { id: 11433, name: '李清照' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '生当作人杰，死亦为鬼雄。',
          '至今思项羽，不肯过江东。',
        ],
      },
    ],
  },
  {
    id: 8618,
    name: '辛弃疾',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '稼轩居士',
    description: '字幼安，号稼轩，南宋豪放派词人、将领。其词题材广阔，风格沉雄豪迈，气吞万里如虎，与苏轼合称“苏辛”。',
    poemCount: 600,
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
          '马作的卢飞快，弓如霹雳弦惊。',
          '了却君王天下事，赢得生前身后名。可怜白发生！',
        ],
      },
      {
        id: 71066,
        title: '永遇乐·京口北固亭怀古',
        author: { id: 8618, name: '辛弃疾' },
        dynasty: { id: 8, name: '宋' },
        type: { id: 20, name: '宋词' },
        content: [
          '千古江山，英雄无觅孙仲谋处。',
          '舞榭歌台，风流总被雨打风吹去。',
          '斜阳草树，寻常巷陌，人道寄奴曾住。',
          '想当年，金戈铁马，气吞万里如虎。',
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
          '宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。',
          '蛾儿雪柳黄金缕。笑语盈盈暗香去。',
          '众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。',
        ],
      },
    ],
  },
  {
    id: 7756,
    name: '王维',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗佛',
    description: '字摩诘，号摩诘居士，唐代著名诗人、画家。精通诗书画乐，以山水田园诗著称，苏轼赞其“诗中有画，画中有诗”。',
    poemCount: 400,
    poems: [
      {
        id: 300149,
        title: '山居秋暝',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '空山新雨后，天气晚来秋。',
          '明月松间照，清泉石上流。',
          '竹喧归浣女，莲动下渔舟。',
          '随意春芳歇，王孙自可留。',
        ],
      },
      {
        id: 300150,
        title: '相思',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: [
          '红豆生南国，春来发几枝。',
          '愿君多采撷，此物最相思。',
        ],
      },
      {
        id: 300151,
        title: '九月九日忆山东兄弟',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 12, name: '七言绝句' },
        content: [
          '独在异乡为异客，每逢佳节倍思亲。',
          '遥知兄弟登高处，遍插茱萸少一人。',
        ],
      },
      {
        id: 300152,
        title: '使至塞上',
        author: { id: 7756, name: '王维' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '单车欲问边，属国过居延。',
          '征蓬出汉塞，归雁入胡天。',
          '大漠孤烟直，长河落日圆。',
          '萧关逢候骑，都护在燕然。',
        ],
      },
    ],
  },
  {
    id: 9057,
    name: '白居易',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗魔',
    description: '字乐天，号香山居士，唐代伟大的现实主义诗人。倡导新乐府运动，其诗语言平易通俗，雅俗共赏。',
    poemCount: 2800,
    poems: [
      {
        id: 269310,
        title: '赋得古原草送别',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 13, name: '五言律诗' },
        content: [
          '离离原上草，一岁一枯荣。',
          '野火烧不尽，春风吹又生。',
          '远芳侵古道，晴翠接荒城。',
          '又送王孙去，萋萋满别情。',
        ],
      },
      {
        id: 269311,
        title: '问刘十九',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 11, name: '五言绝句' },
        content: [
          '绿蚁新醅酒，红泥小火炉。',
          '晚来天欲雪，能饮一杯无？',
        ],
      },
      {
        id: 269312,
        title: '钱塘湖春行',
        author: { id: 9057, name: '白居易' },
        dynasty: { id: 6, name: '唐' },
        type: { id: 14, name: '七言律诗' },
        content: [
          '孤山寺北贾亭西，水面初平云脚低。',
          '几处早莺争暖树，谁家新燕啄春泥。',
          '乱花渐欲迷人眼，浅草才能没马蹄。',
          '最爱湖东行不足，绿杨阴里白沙堤。',
        ],
      },
    ],
  },
];

/**
 * Find poet by name (exact or partial matching)
 */
export function findPoetByName(name: string): FamousPoetProfile | undefined {
  const clean = name.trim().toLowerCase();
  return FAMOUS_POETS_DIRECTORY.find((p) => p.name.toLowerCase().includes(clean) || clean.includes(p.name.toLowerCase()));
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
  const poet = findPoetByName(authorName);
  if (!poet || !poet.poems || poet.poems.length === 0) {
    return { poems: [], totalCount: 0, totalPages: 0, hasMore: false };
  }

  const all = poet.poems;
  const totalCount = all.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const poems = all.slice(startIndex, endIndex);
  return {
    poems,
    totalCount,
    totalPages,
    hasMore: page < totalPages,
  };
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
