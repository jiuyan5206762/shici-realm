// Flying Flower Duel Classical Poetry Database & Matching Engine (飞花令对诗引擎)
import { FAMOUS_POETS_DIRECTORY } from '@/utils/poetDirectory';

export interface FeihuaVerse {
  line: string;
  author: string;
  dynasty: string;
  title: string;
}

export interface FeihuaPersona {
  id: string;
  name: string;
  dynasty: string;
  title: string;
  avatarBg: string;
  avatarText: string;
  intro: string;
  style: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'master';
}

export const FEIHUA_DEFAULT_KEYWORDS = [
  '春', '花', '月', '风', '夜', '山', '水', '酒',
  '秋', '云', '雪', '人', '江', '雨', '归', '思'
];

export const FEIHUA_PERSONAS: FeihuaPersona[] = [
  {
    id: 'libai',
    name: '李白',
    dynasty: '唐',
    title: '青莲居士 · 诗仙',
    avatarBg: 'bg-[#2A4365]',
    avatarText: '太白',
    intro: '天生我材必有用，千金散尽还复来。好酒好月，诗气豪迈。',
    style: '豪放不羁，醉引星辰',
    difficulty: 'master',
  },
  {
    id: 'sushi',
    name: '苏轼',
    dynasty: '宋',
    title: '东坡居士 · 文豪',
    avatarBg: 'bg-[#4F7762]',
    avatarText: '东坡',
    intro: '竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。旷达通透，诗词双绝。',
    style: '旷达洒脱，雅趣盎然',
    difficulty: 'hard',
  },
  {
    id: 'liqingzhao',
    name: '李清照',
    dynasty: '宋',
    title: '易安居士 · 词宗',
    avatarBg: 'bg-[#BA3B46]',
    avatarText: '易安',
    intro: '生当作人杰，死亦为鬼雄。寻寻觅觅，婉约情深。',
    style: '婉约细腻，清奇典雅',
    difficulty: 'hard',
  },
  {
    id: 'dufu',
    name: '杜甫',
    dynasty: '唐',
    title: '少陵野老 · 诗圣',
    avatarBg: 'bg-[#8C5E35]',
    avatarText: '子美',
    intro: '安得广厦千万间，大庇天下寒士俱欢颜。沉郁顿挫，家国情怀。',
    style: '沉郁顿挫，悲悯苍生',
    difficulty: 'medium',
  },
  {
    id: 'wangwei',
    name: '王维',
    dynasty: '唐',
    title: '摩诘居士 · 诗佛',
    avatarBg: 'bg-[#947B62]',
    avatarText: '摩诘',
    intro: '行到水穷处，坐看云起时。诗中有画，画中有诗。',
    style: '禅意空灵，静水流深',
    difficulty: 'easy',
  },
];

// Rich curated database for classical Flying Flower keywords
export const FEIHUA_VERSES_DB: Record<string, FeihuaVerse[]> = {
  '春': [
    { line: '春眠不觉晓，处处闻啼鸟', author: '孟浩然', dynasty: '唐', title: '春晓' },
    { line: '国破山河在，城春草木深', author: '杜甫', dynasty: '唐', title: '春望' },
    { line: '人面不知何处去，桃花依旧笑春风', author: '崔护', dynasty: '唐', title: '题都城南庄' },
    { line: '春风又绿江南岸，明月何时照我还', author: '王安石', dynasty: '宋', title: '泊船瓜洲' },
    { line: '好雨知时节，当春乃发生', author: '杜甫', dynasty: '唐', title: '春夜喜雨' },
    { line: '春色满园关不住，一枝红杏出墙来', author: '叶绍翁', dynasty: '宋', title: '游园不值' },
    { line: '竹外桃花三两枝，春江水暖鸭先知', author: '苏轼', dynasty: '宋', title: '惠崇春江晚景' },
    { line: '不知细叶谁裁出，二月春风似剪刀', author: '贺知章', dynasty: '唐', title: '咏柳' },
    { line: '乱花渐欲迷人眼，浅草才能没马蹄', author: '白居易', dynasty: '唐', title: '钱塘湖春行' },
    { line: '红豆生南国，春来发几枝', author: '王维', dynasty: '唐', title: '相思' },
    { line: '小楼一夜听春雨，深巷明朝卖杏花', author: '陆游', dynasty: '宋', title: '临安春雨初霁' },
    { line: '春蚕到死丝方尽，蜡炬成灰泪始干', author: '李商隐', dynasty: '唐', title: '无题' },
    { line: '沉舟侧畔千帆过，病树前头万木春', author: '刘禹锡', dynasty: '唐', title: '酬乐天扬州初逢席上见赠' },
    { line: '日出江花红胜火，春来江水绿如蓝', author: '白居易', dynasty: '唐', title: '忆江南' },
    { line: '春水碧于天，画船听雨眠', author: '韦庄', dynasty: '唐', title: '菩萨蛮' },
  ],
  '花': [
    { line: '待到重阳日，还来就菊花', author: '孟浩然', dynasty: '唐', title: '过故人庄' },
    { line: '夜来风雨声，花落知多少', author: '孟浩然', dynasty: '唐', title: '春晓' },
    { line: '感时花溅泪，恨别鸟惊心', author: '杜甫', dynasty: '唐', title: '春望' },
    { line: '借问酒家何处有，牧童遥指杏花村', author: '杜牧', dynasty: '唐', title: '清明' },
    { line: '花间一壶酒，独酌无相亲', author: '李白', dynasty: '唐', title: '月下独酌' },
    { line: '接天莲叶无穷碧，映日荷花别样红', author: '杨万里', dynasty: '宋', title: '晓出净慈寺送林子方' },
    { line: '落红不是无情物，化作春泥更护花', author: '龚自珍', dynasty: '清', title: '己亥杂诗' },
    { line: '无可奈何花落去，似曾相识燕归来', author: '晏殊', dynasty: '宋', title: '浣溪沙' },
    { line: '相见时难别亦难，东风无力百花残', author: '李商隐', dynasty: '唐', title: '无题' },
    { line: '曲径通幽处，禅房花木深', author: '常建', dynasty: '唐', title: '题破山寺后禅院' },
    { line: '梨花院落溶溶月，柳絮池塘淡淡风', author: '晏殊', dynasty: '宋', title: '寓意' },
    { line: '忽如一夜春风来，千树万树梨花开', author: '岑参', dynasty: '唐', title: '白雪歌送武判官归京' },
    { line: '沾衣欲湿杏花雨，吹面不寒杨柳风', author: '志南', dynasty: '宋', title: '绝句' },
    { line: '莫道不销魂，帘卷西风，人比黄花瘦', author: '李清照', dynasty: '宋', title: '醉花阴' },
  ],
  '月': [
    { line: '床前明月光，疑是地上霜', author: '李白', dynasty: '唐', title: '静夜思' },
    { line: '举头望明月，低头思故乡', author: '李白', dynasty: '唐', title: '静夜思' },
    { line: '明月几时有？把酒问青天', author: '苏轼', dynasty: '宋', title: '水调歌头' },
    { line: '但愿人长久，千里共婵娟', author: '苏轼', dynasty: '宋', title: '水调歌头' },
    { line: '举杯邀明月，对影成三人', author: '李白', dynasty: '唐', title: '月下独酌' },
    { line: '月落乌啼霜满天，江枫渔火对愁眠', author: '张继', dynasty: '唐', title: '枫桥夜泊' },
    { line: '海上生明月，天涯共此时', author: '张九龄', dynasty: '唐', title: '望月怀远' },
    { line: '露从今夜白，月是故乡明', author: '杜甫', dynasty: '唐', title: '月夜忆舍弟' },
    { line: '深林人不知，明月来相照', author: '王维', dynasty: '唐', title: '竹里馆' },
    { line: '春江潮水连海平，海上明月共潮生', author: '张若虚', dynasty: '唐', title: '春江花月夜' },
    { line: '二十四桥明月夜，玉人何处教吹箫', author: '杜牧', dynasty: '唐', title: '寄扬州韩绰判官' },
    { line: '明月松间照，清泉石上流', author: '王维', dynasty: '唐', title: '山居秋暝' },
    { line: '秦时明月汉时关，万里长征人未还', author: '王昌龄', dynasty: '唐', title: '出塞' },
    { line: '晓镜但愁云鬓改，夜吟应觉月光寒', author: '李商隐', dynasty: '唐', title: '无题' },
  ],
  '风': [
    { line: '夜来风雨声，花落知多少', author: '孟浩然', dynasty: '唐', title: '春晓' },
    { line: '大风起兮云飞扬，威加海内兮归故乡', author: '刘邦', dynasty: '两汉', title: '大风歌' },
    { line: '随风潜入夜，润物细无声', author: '杜甫', dynasty: '唐', title: '春夜喜雨' },
    { line: '长风破浪会有时，直挂云帆济沧海', author: '李白', dynasty: '唐', title: '行路难' },
    { line: '不知细叶谁裁出，二月春风似剪刀', author: '贺知章', dynasty: '唐', title: '咏柳' },
    { line: '八月秋高风怒号，卷我屋上三重茅', author: '杜甫', dynasty: '唐', title: '茅屋为秋风所破歌' },
    { line: '北风卷地白草折，胡天八月即飞雪', author: '岑参', dynasty: '唐', title: '白雪歌送武判官归京' },
    { line: '野火烧不尽，春风吹又生', author: '白居易', dynasty: '唐', title: '赋得古原草送别' },
    { line: '相见时难别亦难，东风无力百花残', author: '李商隐', dynasty: '唐', title: '无题' },
    { line: '风急天高猿啸哀，渚清沙白鸟飞回', author: '杜甫', dynasty: '唐', title: '登高' },
    { line: '古道西风瘦马，夕阳西下，断肠人在天涯', author: '马致远', dynasty: '元', title: '天净沙·秋思' },
  ],
  '夜': [
    { line: '夜宿峰顶寺，举手扪星辰', author: '李白', dynasty: '唐', title: '夜宿山寺' },
    { line: '随风潜入夜，润物细无声', author: '杜甫', dynasty: '唐', title: '春夜喜雨' },
    { line: '姑苏城外寒山寺，夜半钟声到客船', author: '张继', dynasty: '唐', title: '枫桥夜泊' },
    { line: '君问归期未有期，巴山夜雨涨秋池', author: '李商隐', dynasty: '唐', title: '夜雨寄北' },
    { line: '何当共剪西窗烛，却话巴山夜雨时', author: '李商隐', dynasty: '唐', title: '夜雨寄北' },
    { line: '露从今夜白，月是故乡明', author: '杜甫', dynasty: '唐', title: '月夜忆舍弟' },
    { line: '夜深忽梦少年事，梦啼妆泪红阑干', author: '白居易', dynasty: '唐', title: '琵琶行' },
    { line: '二十四桥明月夜，玉人何处教吹箫', author: '杜牧', dynasty: '唐', title: '寄扬州韩绰判官' },
    { line: '东风夜放花千树，更吹落，星如雨', author: '辛弃疾', dynasty: '宋', title: '青玉案·元夕' },
  ],
  '山': [
    { line: '空山新雨后，天气晚来秋', author: '王维', dynasty: '唐', title: '山居秋暝' },
    { line: '白日依山尽，黄河入海流', author: '王之涣', dynasty: '唐', title: '登鹳雀楼' },
    { line: '采菊东篱下，悠然见南山', author: '陶渊明', dynasty: '魏晋', title: '饮酒·其五' },
    { line: '山重水复疑无路，柳暗花明又一村', author: '陆游', dynasty: '宋', title: '游山西村' },
    { line: '横看成岭侧成峰，远近高低各不同', author: '苏轼', dynasty: '宋', title: '题西林壁' },
    { line: '不识庐山真面目，只缘身在此山中', author: '苏轼', dynasty: '宋', title: '题西林壁' },
    { line: '会当凌绝顶，一览众山小', author: '杜甫', dynasty: '唐', title: '望岳' },
    { line: '千山鸟飞绝，万径人踪灭', author: '柳宗元', dynasty: '唐', title: '江雪' },
    { line: '两岸猿声啼不住，轻舟已过万重山', author: '李白', dynasty: '唐', title: '早发白帝城' },
    { line: '相看两不厌，只有敬亭山', author: '李白', dynasty: '唐', title: '独坐敬亭山' },
  ],
  '水': [
    { line: '抽刀断水水更流，举杯销愁愁更愁', author: '李白', dynasty: '唐', title: '宣州谢朓楼饯别校书叔云' },
    { line: '问君能有几多愁？恰似一江春水向东流', author: '李煜', dynasty: '五代', title: '虞美人' },
    { line: '落霞与孤鹜齐飞，秋水共长天一色', author: '王勃', dynasty: '唐', title: '滕王阁序' },
    { line: '水光潋滟晴方好，山色空蒙雨亦奇', author: '苏轼', dynasty: '宋', title: '饮湖上初晴后雨' },
    { line: '竹外桃花三两枝，春江水暖鸭先知', author: '苏轼', dynasty: '宋', title: '惠崇春江晚景' },
    { line: '天门中断楚江开，碧水东流至此回', author: '李白', dynasty: '唐', title: '望天门山' },
    { line: '白日依山尽，黄河入海流', author: '王之涣', dynasty: '唐', title: '登鹳雀楼' },
    { line: '清泉石上流，明月松间照', author: '王维', dynasty: '唐', title: '山居秋暝' },
    { line: '山重水复疑无路，柳暗花明又一村', author: '陆游', dynasty: '宋', title: '游山西村' },
  ],
  '酒': [
    { line: '花间一壶酒，独酌无相亲', author: '李白', dynasty: '唐', title: '月下独酌' },
    { line: '人生得意须尽欢，莫使金樽空对月', author: '李白', dynasty: '唐', title: '将进酒' },
    { line: '借问酒家何处有，牧童遥指杏花村', author: '杜牧', dynasty: '唐', title: '清明' },
    { line: '葡萄美酒夜光杯，欲饮琵琶马上催', author: '王翰', dynasty: '唐', title: '凉州词' },
    { line: '明月几时有？把酒问青天', author: '苏轼', dynasty: '宋', title: '水调歌头' },
    { line: '开轩面场圃，把酒话桑麻', author: '孟浩然', dynasty: '唐', title: '过故人庄' },
    { line: '劝君更尽一杯酒，西出阳关无故人', author: '王维', dynasty: '唐', title: '送元二使安西' },
    { line: '白日放歌须纵酒，青春作伴好还乡', author: '杜甫', dynasty: '唐', title: '闻官军收河南河北' },
    { line: '莫笑农家腊酒浑，丰年留客足鸡豚', author: '陆游', dynasty: '宋', title: '游山西村' },
    { line: '三杯两盏淡酒，怎敌他、晚来风急', author: '李清照', dynasty: '宋', title: '声声慢' },
  ],
  '秋': [
    { line: '自古逢秋悲寂寥，我言秋日胜春朝', author: '刘禹锡', dynasty: '唐', title: '秋词' },
    { line: '空山新雨后，天气晚来秋', author: '王维', dynasty: '唐', title: '山居秋暝' },
    { line: '八月秋高风怒号，卷我屋上三重茅', author: '杜甫', dynasty: '唐', title: '茅屋为秋风所破歌' },
    { line: '万里悲秋常作客，百年多病独登台', author: '杜甫', dynasty: '唐', title: '登高' },
    { line: '古道西风瘦马，夕阳西下，断肠人在天涯', author: '马致远', dynasty: '元', title: '天净沙·秋思' },
    { line: '落霞与孤鹜齐飞，秋水共长天一色', author: '王勃', dynasty: '唐', title: '滕王阁序' },
  ],
  '云': [
    { line: '行到水穷处，坐看云起时', author: '王维', dynasty: '唐', title: '终南别业' },
    { line: '大风起兮云飞扬，威加海内兮归故乡', author: '刘邦', dynasty: '两汉', title: '大风歌' },
    { line: '黄云万里动风色，白波九道流雪山', author: '李白', dynasty: '唐', title: '庐山谣寄卢侍御虚舟' },
    { line: '朝辞白帝彩云间，千里江陵一日还', author: '李白', dynasty: '唐', title: '早发白帝城' },
    { line: '总为浮云能蔽日，长安不见使人愁', author: '李白', dynasty: '唐', title: '登金陵凤凰台' },
    { line: '曾经沧海难为水，除却巫山不是云', author: '元稹', dynasty: '唐', title: '离思五首·其四' },
    { line: '不畏浮云遮望眼，自缘身在最高层', author: '王安石', dynasty: '宋', title: '登飞来峰' },
  ],
  '雪': [
    { line: '千山鸟飞绝，万径人踪灭', author: '柳宗元', dynasty: '唐', title: '江雪' },
    { line: '孤舟蓑笠翁，独钓寒江雪', author: '柳宗元', dynasty: '唐', title: '江雪' },
    { line: '忽如一夜春风来，千树万树梨花开', author: '岑参', dynasty: '唐', title: '白雪歌送武判官归京' },
    { line: '柴门闻犬吠，风雪夜归人', author: '刘长卿', dynasty: '唐', title: '逢雪宿芙蓉山主人' },
    { line: '欲渡黄河冰塞川，将登太行雪满山', author: '李白', dynasty: '唐', title: '行路难' },
    { line: '晚来天欲雪，能饮一杯无', author: '白居易', dynasty: '唐', title: '问刘十九' },
    { line: '梅须逊雪三分白，雪却输梅一段香', author: '卢梅坡', dynasty: '宋', title: '雪梅' },
  ],
  '人': [
    { line: '人生得意须尽欢，莫使金樽空对月', author: '李白', dynasty: '唐', title: '将进酒' },
    { line: '劝君更尽一杯酒，西出阳关无故人', author: '王维', dynasty: '唐', title: '送元二使安西' },
    { line: '人面不知何处去，桃花依旧笑春风', author: '崔护', dynasty: '唐', title: '题都城南庄' },
    { line: '但愿人长久，千里共婵娟', author: '苏轼', dynasty: '宋', title: '水调歌头' },
    { line: '同是天涯沦落人，相逢何必曾相识', author: '白居易', dynasty: '唐', title: '琵琶行' },
    { line: '生当作人杰，死亦为鬼雄', author: '李清照', dynasty: '宋', title: '夏日绝句' },
    { line: '千山鸟飞绝，万径人踪灭', author: '柳宗元', dynasty: '唐', title: '江雪' },
  ],
  '江': [
    { line: '无边落木萧萧下，不尽长江滚滚来', author: '杜甫', dynasty: '唐', title: '登高' },
    { line: '孤帆远影碧空尽，唯见长江天际流', author: '李白', dynasty: '唐', title: '黄鹤楼送孟浩然之广陵' },
    { line: '大江东去，浪淘尽，千古风流人物', author: '苏轼', dynasty: '宋', title: '念奴娇·赤壁怀古' },
    { line: '春江潮水连海平，海上明月共潮生', author: '张若虚', dynasty: '唐', title: '春江花月夜' },
    { line: '日出江花红胜火，春来江水绿如蓝', author: '白居易', dynasty: '唐', title: '忆江南' },
    { line: '江畔何人初见月？江月何年初照人？', author: '张若虚', dynasty: '唐', title: '春江花月夜' },
    { line: '野径云俱黑，江船火独明', author: '杜甫', dynasty: '唐', title: '春夜喜雨' },
    { line: '竹外桃花三两枝，春江水暖鸭先知', author: '苏轼', dynasty: '宋', title: '惠崇春江晚景' },
  ],
  '雨': [
    { line: '清明时节雨纷纷，路上行人欲断魂', author: '杜牧', dynasty: '唐', title: '清明' },
    { line: '好雨知时节，当春乃发生', author: '杜甫', dynasty: '唐', title: '春夜喜雨' },
    { line: '夜来风雨声，花落知多少', author: '孟浩然', dynasty: '唐', title: '春晓' },
    { line: '君问归期未有期，巴山夜雨涨秋池', author: '李商隐', dynasty: '唐', title: '夜雨寄北' },
    { line: '小楼一夜听春雨，深巷明朝卖杏花', author: '陆游', dynasty: '宋', title: '临安春雨初霁' },
    { line: '水光潋滟晴方好，山色空蒙雨亦奇', author: '苏轼', dynasty: '宋', title: '饮湖上初晴后雨' },
    { line: '空山新雨后，天气晚来秋', author: '王维', dynasty: '唐', title: '山居秋暝' },
    { line: '一蓑烟雨任平生，也无风雨也无晴', author: '苏轼', dynasty: '宋', title: '定风波' },
  ],
  '归': [
    { line: '白日放歌须纵酒，青春作伴好还乡', author: '杜甫', dynasty: '唐', title: '闻官军收河南河北' },
    { line: '君问归期未有期，巴山夜雨涨秋池', author: '李商隐', dynasty: '唐', title: '夜雨寄北' },
    { line: '大风起兮云飞扬，威加海内兮归故乡', author: '刘邦', dynasty: '两汉', title: '大风歌' },
    { line: '儿童相见不相识，笑问客从何处来', author: '贺知章', dynasty: '唐', title: '回乡偶书' },
    { line: '柴门闻犬吠，风雪夜归人', author: '刘长卿', dynasty: '唐', title: '逢雪宿芙蓉山主人' },
    { line: '无可奈何花落去，似曾相识燕归来', author: '晏殊', dynasty: '宋', title: '浣溪沙' },
    { line: '采薇采薇，薇亦作止。曰归曰归，岁亦莫止', author: '佚名', dynasty: '先秦', title: '采薇' },
  ],
  '思': [
    { line: '举头望明月，低头思故乡', author: '李白', dynasty: '唐', title: '静夜思' },
    { line: '红豆生南国，春来发几枝。愿君多采撷，此物最相思', author: '王维', dynasty: '唐', title: '相思' },
    { line: '春蚕到死丝方尽，蜡炬成灰泪始干', author: '李商隐', dynasty: '唐', title: '无题' },
    { line: '古道西风瘦马，夕阳西下，断肠人在天涯', author: '马致远', dynasty: '元', title: '天净沙·秋思' },
    { line: '物是人非事事休，欲语泪先流', author: '李清照', dynasty: '宋', title: '武陵春' },
    { line: '相思相见知何日？此时此夜难为情', author: '李白', dynasty: '唐', title: '三五七言' },
  ],
};

// Default high-frequency keyword chips
export const POPULAR_FEIHUA_CHARS = ['春', '花', '月', '风', '夜', '山', '水', '酒', '秋', '云', '雪', '人', '江', '雨', '归', '思'];

export class FeihuaService {
  /**
   * Dynamically fetch or generate classical verses for ANY single Chinese character
   */
  public static getVersesForChar(targetChar: string): FeihuaVerse[] {
    if (!targetChar) return [];
    const char = targetChar.trim().charAt(0);
    if (!char) return [];

    // 1. Check pre-cached database
    if (FEIHUA_VERSES_DB[char] && FEIHUA_VERSES_DB[char].length > 0) {
      return FEIHUA_VERSES_DB[char];
    }

    // 2. Dynamically scan FAMOUS_POETS_DIRECTORY
    const extractedVerses: FeihuaVerse[] = [];
    const seenLines = new Set<string>();

    for (const poet of FAMOUS_POETS_DIRECTORY) {
      for (const poem of poet.poems) {
        if (!poem.content || poem.content.length === 0) continue;

        for (const rawLine of poem.content) {
          // A content line might contain clauses separated by punctuation
          const clauses = rawLine.split(/[，。！？；\n]/).map((s) => s.trim()).filter(Boolean);
          for (const clause of clauses) {
            if (clause.includes(char) && clause.length >= 4 && clause.length <= 16) {
              if (!seenLines.has(clause)) {
                seenLines.add(clause);
                extractedVerses.push({
                  line: clause,
                  author: poem.author?.name || poet.name,
                  dynasty: poem.dynasty?.name || poet.dynasty?.name || '唐',
                  title: poem.title,
                });
              }
            }
          }

          if (rawLine.includes(char) && rawLine.length >= 5 && rawLine.length <= 24) {
            const cleanLine = rawLine.trim();
            if (!seenLines.has(cleanLine)) {
              seenLines.add(cleanLine);
              extractedVerses.push({
                line: cleanLine,
                author: poem.author?.name || poet.name,
                dynasty: poem.dynasty?.name || poet.dynasty?.name || '唐',
                title: poem.title,
              });
            }
          }
        }
      }
    }

    // Cache dynamic verses
    FEIHUA_VERSES_DB[char] = extractedVerses;
    return extractedVerses;
  }

  // Validate candidate verse
  public static validateVerse(
    input: string,
    targetChar: string,
    usedVerses: string[]
  ): { valid: boolean; reason?: string; match?: FeihuaVerse } {
    const cleanInput = input.trim().replace(/[，。！？、；：“”‘’]/g, '');
    const char = targetChar.trim().charAt(0);
    
    if (!cleanInput) {
      return { valid: false, reason: '请输入诗句' };
    }

    if (!cleanInput.includes(char)) {
      return { valid: false, reason: `诗句中必须包含令字「${char}」` };
    }

    if (cleanInput.length < 4) {
      return { valid: false, reason: '诗句长度过短，需至少为四言诗句' };
    }

    // Check if duplicate in this round
    const isDuplicate = usedVerses.some((v) => {
      const cleanV = v.replace(/[，。！？、；：“”‘’]/g, '');
      return cleanV.includes(cleanInput) || cleanInput.includes(cleanV);
    });

    if (isDuplicate) {
      return { valid: false, reason: '本局中此句诗已被吟诵过，请换一句！' };
    }

    // Try finding exact or partial match in DB or dynamic corpus
    const dbList = FeihuaService.getVersesForChar(char);
    const matched = dbList.find((v) => {
      const cleanDB = v.line.replace(/[，。！？、；：“”‘’]/g, '');
      return cleanDB.includes(cleanInput) || cleanInput.includes(cleanDB);
    });

    return {
      valid: true,
      match: matched || {
        line: input.trim(),
        author: '诗友',
        dynasty: '古典',
        title: '应令佳句',
      },
    };
  }

  // Pick AI's reply verse
  public static getAiVerse(
    targetChar: string,
    usedVerses: string[],
    personaId: string
  ): FeihuaVerse | null {
    const char = targetChar.trim().charAt(0);
    const list = FeihuaService.getVersesForChar(char);
    
    // Find un-used verses
    const candidates = list.filter((v) => {
      const cleanV = v.line.replace(/[，。！？、；：“”‘’]/g, '');
      return !usedVerses.some((u) => {
        const cleanU = u.replace(/[，。！？、；：“”‘’]/g, '');
        return cleanU.includes(cleanV) || cleanV.includes(cleanU);
      });
    });

    if (candidates.length === 0) return null;

    // Filter by persona if available
    const persona = FEIHUA_PERSONAS.find((p) => p.id === personaId);
    if (persona) {
      const personaMatch = candidates.find((c) => c.author.includes(persona.name));
      if (personaMatch) return personaMatch;
    }

    // Random choice
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }

  // Calculate poetic rank title by score
  public static getRankTitle(score: number): { title: string; badge: string; desc: string } {
    if (score >= 120) return { title: '一代诗仙', badge: '封神', desc: '文曲下凡，笔落惊风雨，诗成泣鬼神！' };
    if (score >= 90) return { title: '殿试状元', badge: '状元', desc: '金榜题名第一人，才冠古今！' };
    if (score >= 70) return { title: '及第榜眼', badge: '榜眼', desc: '风雅绝伦，腹有诗书气自华。' };
    if (score >= 50) return { title: '探花郎', badge: '探花', desc: '春风得意马蹄疾，一日看尽长安花。' };
    if (score >= 35) return { title: '会试贡士', badge: '贡士', desc: '诗才敏捷，底蕴深厚。' };
    if (score >= 20) return { title: '乡试举人', badge: '举人', desc: '渐入佳境，熟读唐诗三百首。' };
    if (score >= 10) return { title: '秀才', badge: '秀才', desc: '初涉文苑，小试锋芒。' };
    return { title: '书院童生', badge: '童生', desc: '文采斐然，再接再厉！' };
  }
}
