import { Author, Poem } from '@/types';

export interface FamousPoetProfile extends Author {
  titleBadge?: string;
  poems: Poem[];
}

// Comprehensive database of historical poets across all dynasties with authentic masterpiece collections
export const FAMOUS_POETS_DIRECTORY: FamousPoetProfile[] = [
  // ==================== 先秦 ====================
  {
    id: 9619,
    name: '屈原',
    dynasty: { id: 1, name: '先秦' },
    titleBadge: '楚辞之祖',
    description: '战国时期楚国诗人、政治家，中国浪漫主义文学奠基人，“楚辞”创立者。其诗情志深沉，文采绚烂。',
    poemCount: 25,
    poems: [
      {
        id: 901001,
        title: '离骚',
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
    ],
  },
  // ==================== 两汉 ====================
  {
    id: 9020,
    name: '汉乐府',
    dynasty: { id: 2, name: '两汉' },
    titleBadge: '民歌正宗',
    description: '汉代乐府机关采集的民间诗歌总汇，开创了中国古代叙事诗与抒情诗的崭新风貌。',
    poemCount: 120,
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
    ],
  },
  // ==================== 魏晋 ====================
  {
    id: 8228,
    name: '曹操',
    dynasty: { id: 3, name: '魏晋' },
    titleBadge: '魏武帝',
    description: '字孟德，东汉末年杰出政治家、文学家，建安文学代表人物。其诗气魄雄伟，慷慨悲凉。',
    poemCount: 30,
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
          '东临碣石，以观沧海。',
          '水何澹澹，山岛竦峙。',
          '树木丛生，百草丰茂。',
          '秋风萧瑟，洪波涌起。',
          '日月之行，若出其中；',
          '星汉灿烂，若出其里。',
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
          '神龟虽寿，犹有竟时；',
          '螣蛇乘雾，终为土灰。',
          '老骥伏枥，志在千里；',
          '烈士暮年，壮心不已。',
          '盈缩之期，不但在天；',
          '养怡之福，可得永年。',
          '幸甚至哉，歌以咏志。',
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
    poemCount: 130,
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
          '户庭无尘杂，虚室有余闲。',
          '久在樊笼里，复得返自然。',
        ],
      },
    ],
  },
  // ==================== 唐代 ====================
  {
    id: 2045,
    name: '李白',
    dynasty: { id: 6, name: '唐' },
    titleBadge: '诗仙',
    description: '字太白，号青莲居士，唐代伟大的浪漫主义诗人。其诗风豪放飘逸，气吞山河，与杜甫并称“大李杜”。',
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
    ],
  },
  // ==================== 五代 ====================
  {
    id: 9055,
    name: '李煜',
    dynasty: { id: 7, name: '五代' },
    titleBadge: '词中之帝',
    description: '字重光，号钟隐、莲峰居士，南唐末代君主，五代词人集大成者。王国维赞其“词至李后主而眼界始大，感慨遂深”。',
    poemCount: 45,
    poems: [
      {
        id: 905501,
        title: '虞美人·春花秋月何时了',
        author: { id: 9055, name: '李煜' },
        dynasty: { id: 7, name: '五代' },
        type: { id: 20, name: '五代词' },
        content: [
          '春花秋月何时了？往事知多少。',
          '小楼昨夜又东风，故国不堪回首月明中。',
          '雕栏玉砌应犹在，只是朱颜改。',
          '问君能有几多愁？恰似一江春水向东流。',
        ],
      },
      {
        id: 905502,
        title: '相见欢·无言独上西楼',
        author: { id: 9055, name: '李煜' },
        dynasty: { id: 7, name: '五代' },
        type: { id: 20, name: '五代词' },
        content: [
          '无言独上西楼，月如钩。',
          '寂寞梧桐深院锁清秋。',
          '剪不断，理还乱，是离愁。',
          '别是一般滋味在心头。',
        ],
      },
    ],
  },
  // ==================== 宋代 ====================
  {
    id: 11678,
    name: '苏轼',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '东坡居士',
    description: '字子瞻，号东坡居士，世称苏东坡。北宋文学家、书画家，“唐宋八大家”之一，豪放词派开创者。',
    poemCount: 2700,
    poems: [
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
          '回首向来萧瑟处，归去，也无风雨也无晴。',
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
    ],
  },
  {
    id: 11433,
    name: '李清照',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '易安居士',
    description: '号易安居士，宋代女词人，婉约词派代表，有“千古第一才女”之称。',
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
    ],
  },
  {
    id: 8618,
    name: '辛弃疾',
    dynasty: { id: 8, name: '宋' },
    titleBadge: '稼轩居士',
    description: '字幼安，号稼轩，南宋豪放派词人、将领。其词题材广阔，风格沉雄豪迈，气吞万里如虎。',
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
    ],
  },
  // ==================== 清代 ====================
  {
    id: 3074,
    name: '纳兰性德',
    dynasty: { id: 10, name: '清' },
    titleBadge: '饮水词人',
    description: '原名纳兰成德，字容若，号楞伽山人，清代著名词人。其词沉郁真切，深婉动人。',
    poemCount: 300,
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
    ],
  },
];

/**
 * Find poet by name (exact or partial matching)
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

  // Gather all available curated poems
  for (const poet of FAMOUS_POETS_DIRECTORY) {
    list.push(...poet.poems);
  }

  // Filter by author
  if (author) {
    const cleanAuthor = author.trim().toLowerCase();
    list = list.filter((p) => p.author?.name?.toLowerCase().includes(cleanAuthor));
  }

  // Filter by dynasty
  if (dynasty) {
    list = list.filter((p) => p.dynasty?.name === dynasty);
  }

  // Filter by type (with smart semantic matching, e.g. "唐诗" matches Tang poems, "宋词" matches lyric poems)
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
