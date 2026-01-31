// server.js (핵심 로직 & 데이터 저장소)
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. 핵심 데이터 (여기에 숨김)
const DATA_SHEET = {
    "country": [
        "South Korea (대한민국)", "USA / Americas (미주)", "Europe (유럽)", 
        "Asia / Middle East (아시아/중동)", "Nature / Wild (대자연/오지)", "Sci-Fi / Space (우주/미래)"
    ],
    "region": [
        "Seoul Gangnam (서울 강남)", "Seoul Seongsu (서울 성수)", "Seoul Hannam (서울 한남)", "Seoul Bukchon (서울 북촌)", 
        "Seoul Insa-dong (서울 인사동)", "Seoul Ikseon-dong (서울 익선동)", "Seoul Myeong-dong (서울 명동)", 
        "Seoul Gwanghwamun (서울 광화문)", "Seoul Yeouido (서울 여의도)", "Seoul Itaewon (서울 이태원)", 
        "Seoul Dongdaemun DDP Area (서울 동대문)", "Seoul Mapo-gu (서울 마포)", "Seoul Mangwon-dong (서울 망원동)", 
        "Seoul Seochon Village (서울 서촌 마을)", "Seoul Euljiro (서울 을지로)",
        "Incheon Songdo (인천 송도)", "Incheon Gaehang-ro (인천 개항로)", "Incheon China Town (인천 차이나타운)", 
        "Pangyo Techno Valley (판교)", "Suwon Hwaseong Fortress (수원 화성)", "Paju Heyri Art Village (파주 헤이리)", 
        "Yangpyeong Dumulmeori (양평 두물머리)", "Ansan Industrial Complex (안산 반월공단)", "Goyang Ilsan Lake Park (고양 일산 호수공원)", 
        "Namyangju Han River View (남양주 한강변)", "Gwangmyeong Cave Area (광명동굴 주변)", "Yongin Folk Village (용인 민속촌)",
        "Busan Haeundae (부산 해운대)", "Busan Gamcheon Culture Village (부산 감천문화마을)", "Busan Jagalchi Market (부산 자갈치 시장)", 
        "Busan Marine City (부산 마린시티)", "Busan Gwangalli Bridge (부산 광안대교)", 
        "Jeju Volcanic Coast (제주 해안)", "Jeju Seogwipo Coast (제주 서귀포 해안)", "Jeju Aewol Cafe Street (제주 애월 카페거리)", 
        "Jeju Seongsan Ilchulbong (제주 성산 일출봉)", "Jeju Hallasan Mountain (제주 한라산)", "Jeju Bijarim Forest (제주 비자림)",
        "Gangneung Anmok Beach (강릉 안목해변)", "Sokcho Abai Village (속초 아바이마을)", "Pyeongchang Alpensia (평창 알펜시아)", 
        "Chuncheon Soyang River (춘천 소양강)", "Daejeon Science Town (대전 대덕연구단지)", "Sejong Government Complex (세종 정부청사)", 
        "Cheongju Tobacco Plant (청주 제조창)", "Gongju Hanok Village (공주 한옥마을)", "Buyeo Baekje Historic Site (부여 백제 유적지)", 
        "Danyang Suyanggae (단양 수양개)", "Daegu Kim Kwang-seok Road (대구 김광석 거리)", "Ulsan Industrial Port (울산 산업항)", 
        "Gyeongju Bulguksa Temple (경주 불국사)", "Gyeongju Hwangnam-dong (경주 황남동/황리단길)", "Gyeongju Historic Site (경주)", 
        "Andong Hahoe Village (안동 하회마을)", "Pohang Homigot (포항 호미곶)", "Jeonju Hanok Village (전주 한옥마을)", 
        "Gwangju Asia Culture Center (광주 아시아문화전당)", "Yeosu Night Sea (여수 밤바다)", "Suncheon Bay Wetland (순천만 습지)", 
        "Mokpo Modern History District (목포 근대역사거리)",
        "Modern Manhattan (맨해튼)", "New York Brooklyn (뉴욕 브루클린)", "Parisian Street (파리)", "London Victorian District (런던)", 
        "Cyberpunk Neo-Tokyo (도쿄)", "Kyoto Zen Garden (교토)", "Kyoto Arashiyama (교토 아라시야마)", "Osaka Dotonbori (오사카 도톤보리)", 
        "Hong Kong Neon Street (홍콩)", "Shanghai The Bund (상하이 와이탄)", "Beijing Great Wall (만리장성)", 
        "Singapore Gardens by the Bay (싱가포르 가든스 바이 더 베이)", "Bangkok Chao Phraya (방콕 짜오프라야)", 
        "Taipei 101 Area (타이베이)", "Kuala Lumpur Petronas (쿠알라룸푸르)", "Vietnam Ha Long Bay (베트남 하롱베이)", 
        "Dubai Marina (두바이)", "Istanbul Bosphorus (이스탄불 보스포루스)", "Rome Colosseum Area (로마 콜로세움)", 
        "Venice Canal (베네치아 운하)", "Barcelona Eixample (바르셀로나 에이샴플라)", "Berlin Mitte (베를린 미테)", 
        "Amsterdam Canal Ring (암스테르담 운하)", "Prague Old Town (프라하 구시가지)", "Moscow Red Square (모스크바 붉은광장)", 
        "Sydney Harbour (시드니 하버)", "Los Angeles Beverly Hills (LA 비벌리힐스)", "San Francisco Hill (샌프란시스코 언덕)", 
        "Miami Art Deco District (마이애미 아트데코)", "Toronto CN Tower View (토론토 도심)", "Vancouver Seawall (밴쿠버 해안)", 
        "Mexico City Zocalo (멕시코시티)", "Rio Copacabana (리오 코파카바나)", "Buenos Aires La Boca (부에노스아이레스)", 
        "Mumbai Slum Contrast (뭄바이 도심)", "Cape Town Table Mountain (케이프타운)", "Marrakech Medina (마라케시 메디나)", 
        "Cairo Giza Plateau (카이로 기자)",
        "Swiss Alpine (알프스)", "Scandinavian Fjord (북유럽 피오르)", "Reykjavik Ice Field (레이캬비크 설원)", "Norwegian Village (노르웨이 마을)", 
        "Santorini White (산토리니)", "Tuscany Vineyard (토스카나 포도원)", "Provence Lavender Field (프로방스 라벤더 밭)", 
        "Sahara Desert Oasis (사하라 사막 오아시스)", "Amazon Rainforest (아마존 열대우림)", "Grand Canyon Edge (그랜드 캐년)", 
        "Rocky Mountains (록키 산맥)", "Bali Ubud Jungle (발리 우붓 정글)", "Maldives Overwater (몰디브 수상)", 
        "Petra Ancient City (페트라)", "Machu Picchu Ruins (마추픽추)", "Acropolis Hill (아크로폴리스)", "Stonehenge Plain (스톤헨지 평원)", 
        "Antarctica Research Station (남극 기지)",
        "Mars Colony (화성 식민지)", "Moon Surface Base (달 기지)", "Underwater City (수중 도시)", "Cloud City (공중 도시)"
    ],
    "site": [
        "on a corner lot (모퉁이 대지)", "narrow in-fill site (협소지)", "between skyscrapers (빌딩 사이)", 
        "pedestrian street (보행자 도로)", "suburban cul-de-sac (막다른 골목)", "urban rooftop (도심 옥상)", 
        "high-density block (고밀도 블록)", "historic district (역사 지구)", "university campus (대학 캠퍼스)", "stadium surroundings (경기장 주변)",
        "Narrow Golmok Alley (좁은 골목길)", "Daldongne Hillside (달동네/가파른 주거지)", "Traditional Market Entrance (전통시장 입구)", 
        "Redevelopment District (재개발 구역)", "Subway Station Exit (지하철 역세권)", "Semi-basement Window Level (반지하 레벨)", 
        "Apartment Complex Edge (아파트 단지 가장자리)", "Under Elevated Highway (고가도로 하부/청계천 등)", "Soundproof Wall Side (대로변 방음벽 옆)",
        "on a steep slope (경사지)", "atop a hill (언덕 꼭대기)", "mountain peak (산 정상)", "valley bottom (계곡 바닥)", 
        "cliffside (절벽 끝)", "cliff overhang (절벽 돌출부)", "rocky coastline (바위 해안)", "oceanfront (해안가)", 
        "river delta (강 삼각주)", "lake side (호수변)", "waterfall base (폭포 아래)", "cave entrance (동굴 입구)", 
        "forest clearing (숲속 공터)", "bamboo forest (대나무 숲)", "dense jungle (밀림 속)", "pine forest (소나무 숲)", 
        "birch forest (자작나무 숲)", "redwood forest (레드우드 숲)", "mangrove forest (맹그로브 숲)", 
        "swampy wetland (습지)", "terraced rice field (계단식 논)", "desert dunes (사막 언덕)", "savanna plain (사바나 평원)", 
        "salt flat (소금 사막)", "glacier edge (빙하 끝)", "arctic tundra (북극 툰드라)", "volcanic crater (분화구)",
        "Baesanimsu Setting (배산임수/뒤는 산 앞은 물)", "Rice Paddy View (논 뷰)", "Green Tea Field (녹차밭)", 
        "Tidal Flat (서해안 갯벌)", "Reservoir Side (저수지 옆)", "Adjacent to Fortress Wall (성곽길 옆/한양도성)", 
        "Pine Tree Hill (소나무 언덕)", "Stream Walkway (천변 산책로)",
        "industrial brownfield (폐공장 부지)", "reclaimed land (간척지)", "mining quarry (채석장)", "container yard (컨테이너 야적장)", 
        "industrial harbor (산업 항구)", "harbor dock (항구 부두)", "airport runway side (활주로 옆)", 
        "abandoned railway (폐철도)", "bridge underpass (다리 밑)", "highway median (고속도로 중앙분리대)", 
        "roundabout center (회전교차로 중앙)", "dam spillway (댐 방수로)", "oil rig platform (석유 시추선)", 
        "scaffold structure (비계 구조물)", "within urban ruins (유적지)",
        "floating on water (수상)", "floating platform (부유식 플랫폼)", "underwater reef (수중 산호초)", 
        "underground (지하)", "treehouse canopy (나무 위)", "private island (개인 섬)", "tropical atoll (열대 산호섬)", 
        "meteor crater (운석 구덩이)", "lunar crater (달 분화구)", "mars canyon (화성 협곡)", "space station module (우주 정거장)", "golf course view (골프장 뷰)", "adjacent to park (공원 인접)"
    ],
    "usage_mapping": {
        "1.단독주택": ["Detached House (단독주택)", "Multi-unit House (다중주택)", "Daga-gu House (다가구주택)"],
        "2.공동주택": ["Apartment (아파트)", "Row House (연립주택)", "Multi-family House (다세대주택)", "Dormitory (기숙사)"],
        "3.제1종근린생활시설": ["Small Retail (소매점)", "Bakery/Cafe (휴게음식점)", "Barber/Beauty Shop (이용원/미용원)", "Clinic (의원)", "Public Library (공공도서관)"],
        "4.제2종근린생활시설": ["Restaurant (일반음식점)", "Movie Theater (공연장)", "Church (종교집회장)", "Academy (학원)", "PC Room (다중생활시설)"],
        "5.문화및집회시설": ["Concert Hall (공연장)", "Assembly Hall (집회장)", "Racecourse (경마장)", "Museum (박물관)", "Art Gallery (미술관)"],
        "6.종교시설": ["Church (교회)", "Temple (성당/사찰)", "Religious Cloister (수도원)"],
        "7.판매시설": ["Wholesale Market (도매시장)", "Retail Market (소매시장)", "Department Store (백화점)"],
        "8.운수시설": ["Passenger Terminal (여객자동차터미널)", "Railway Station (철도역사)", "Airport (공항)", "Harbor (항만)"],
        "9.의료시설": ["General Hospital (종합병원)", "Isolation Hospital (격리병원)"],
        "10.교육연구시설": ["School (학교)", "Education Institute (교육원)", "Research Center (연구소)", "Library (도서관)"],
        "11.노유자시설": ["Aged Care (노인복지시설)", "Children Care (아동복지시설)"],
        "12.수련시설": ["Youth Hostel (유스호스텔)", "Training Center (연수원)"],
        "13.운동시설": ["Gymnasium (체육관)", "Swimming Pool (운동장/수영장)"],
        "14.업무시설": ["Public Office (공공청사)", "Office Building (오피스텔/일반업무)"],
        "15.숙박시설": ["Hotel (일반숙박)", "Tourist Hotel (관광숙박)", "Dajung House (다중생활시설)"],
        "16.위락시설": ["Casino (카지노)", "Nightclub (유흥주점)", "Race-betting Hall (무도장)"],
        "17.공장": ["Manufacturing Plant (제조업소)", "Knowledge Center (지식산업센터)"],
        "18.창고시설": ["Storage Warehouse (일반창고)", "Logistics Center (물류터미널)", "Cold Storage (냉동창고)"],
        "19.위험물저장및처리": ["Gas Station (주유소)", "Liquid Fuel Depot (액체연료창고)", "Hazardous Warehouse (위험물창고)"],
        "20.자동차관련시설": ["Car Park (주차장)", "Car Service Center (세차장/수리점)", "Driving School (운전학원)"],
        "21.동물및식물관련시설": ["Livestock Shed (축사)", "Greenhouse (온실)", "Slaughterhouse (도축장)"],
        "22.자원순환관련시설": ["Sewage Treatment (하수처리)", "Recycling Center (고물상/재활용)"],
        "23.교정및군사시설": ["Correctional Center (교도소)", "Military Camp (군사시설)"],
        "24.방송통신시설": ["Broadcasting Station (방송국)", "Telecom Center (전신전화국)", "Data Center (데이터센터)"],
        "25.발전시설": ["Power Plant (발전소)", "Wind/Solar Farm (신재생에너지 발전소)"],
        "26.묘지관련시설": ["Crematorium (화장시설)", "Ossuary (봉안당)", "Funeral Hall (묘지관리)"],
        "27.관광휴게시설": ["Outdoor Theater (야외음악당)", "Rest Area (어린이회관/휴게소)"],
        "28.장례시설": ["Funeral Home (장례식장)"],
        "29.야영장시설": ["Camping Site (야영장)"]
    },
    "style": [
        "Minimalist (미니멀리즘)", "International Style (국제주의 양식)", "Bauhaus (바우하우스)", "Mid-Century Modern (미드센추리 모던)", "Industrial Chic (인더스트리얼 시크)", "Postmodernism (포스트모더니즘)", "Deconstructivist (해체주의)", "Tiny House Movement (타이니 하우스)", "Shipping Container (컨테이너 건축)", "Le Corbusier Style (르 코르뷔지에 스타일)", "Tadao Ando Style (안도 타다오 스타일)", "Frank Gehry Style (프랭크 게리 스타일)",
        "Traditional Hanok (전통 한옥)", "Traditional Japanese (전통 일본식)", "Traditional Chinese (전통 중국식)", "Neoclassical (신고전주의)", "Renaissance (르네상스)", "Baroque (바로크)", "Rococo (로코코)", "Gothic Revival (고딕 리바이벌)", "Romanesque (로마네스크)", "Byzantine (비잔틴)", "Islamic Architecture (이슬람 양식)", "Art Nouveau (아르누보)", "Art Deco (아트데코)", "Victorian (빅토리아 양식)", "Edwardian (에드워디안)", "Tudor Style (튜더 양식)", "Colonial Style (식민지 양식)", "Craftsman (크래프츠맨)", "Prairie Style (프레리 양식)", "Mediterranean (지중해식)", "Scandivavian (북유럽식)", "Vernacular (토속 건축)", "Rustic Cabin (러스틱 캐빈)", "Brutalist (브루탈리즘)", "Constructivism (구성주의)",
        "Organic Architecture (유기적 건축)", "Biophilic (바이오필릭)", "Eco-Brutalism (에코 브루탈리즘)", "Sustainable Design (지속가능 디자인)", "Blobitecture (블롭 건축)", "Earthship (어스십)", "Vertical Farm (수직 농장)", "Zaha Hadid Style (자하 하디드 스타일)",
        "Cyberpunk (사이버펑크)", "Futurism (퓨처리즘)", "Neo-Futurism (네오 퓨처리즘)", "Parametric (파라메트릭)", "Metabolism (메타볼리즘)", "High-Tech (하이테크)", "Space Age (스페이스 에이지)", "Steampunk (스팀펑크)", "Solarpunk (솔라펑크)", "Dieselpunk (디젤펑크)", "Atomic Age (아토믹 에이지)", "Googie Architecture (구기 건축)", "Modular Prefab (모듈러 프리패브)", "Geodesic Dome (지오데식 돔)", "Floating Architecture (수상 건축)"
    ],
    "mat": [
        "Exposed Concrete (노출 콘크리트)", "Curtain Wall Glass (커튼월)", "White Stucco (화이트 스타코)", "Polished Steel (폴리싱 스틸)", "Brushed Aluminum (헤어라인 알루미늄)", "Frosted Glass (반투명 유리)", "Glass Block (유리 블록)", "Plywood (합판)", "OSB Board (OSB 합판)", "Recycled Plastic (재활용 플라스틱)", "Ceramic Tile (세라믹 타일)", "Asphalt Shingle (아스팔트 슁글)",
        "Red Brick (붉은 벽돌)", "Marble (대리석)", "Limestone (라임스톤)", "Travertine (트래버틴)", "Sandstone (샌드스톤)", "Granite (화강암)", "Basalt (현무암)", "Slate (슬레이트)", "Obsidian (흑요석)", "Terrazzo (테라조)", "Copper Patina (녹청 구리)", "Bronze (청동)", "Brass (황동)", "Gold Leaf (금박)", "Rammed Earth (다짐 흙)", "Adobe Mud (어도비 흙벽)", "Thatch Roof (초가지붕)", "Korean Giwa (기와)", "Charred Wood (탄화목)", "Weathered Barn Wood (고재)", "Shou Sugi Ban (탄화목)", "Corten Steel (코르텐강)", "Zinc Cladding (징크 마감)", "Corrugated Metal (골함석)", "Mosaic Tile (모자이크 타일)", "Terracotta Louver (테라코타 루버)", "Gabion Wall (돌망태)",
        "CLT Timber (구조용 목재)", "Bamboo (대나무)", "Rattan (라탄)", "Cork (코르크)", "Green Wall (수직 정원)", "Moss Wall (이끼 벽)", "Myceium Brick (균사체 벽돌)", "Hempcrete (헴프크리트)",
        "Titanium Panel (티타늄 패널)", "Carbon Fiber (카본 파이버)", "Fiberglass (유리섬유)", "Smart Glass (스마트 글라스)", "Dichroic Glass (다이크로익 유리)", "Photovoltaic Glass (태양광 유리)", "Polycarbonate (폴리카보네이트)", "ETFE Pillow (ETFE 막)", "Tensile Fabric (인장 막)", "Perforated Metal (타공 금속)", "Wire Mesh (와이어 메쉬)", "Expanded Metal (익스펜디드 메탈)", "Stained Glass (스테인드 글라스)"
    ],
    "floor": [
        "1st Floor (1층)", "2nd Floor (2층)", "3rd Floor (3층)", "4th Floor (4층)", "5th Floor (5층)", 
        "6th Floor (6층)", "7th Floor (7층)", "8th Floor (8층)", "9th Floor (9층)", 
        "Single-story (단층)", "Two-story (2층)", "Low-rise (저층)", "Mid-rise (중층)", "Skyscraper (마천루)", "Cantilevered (캔틸레버)", "Terraced (테라스형)",
        "Super-tall Tower (초고층 타워)", "Mega-tall Structure (메가톨)", "Podium Tower (포디움 타워)", "Twin Towers (쌍둥이 빌딩)", "Triplets Towers (세 쌍둥이 빌딩)", "Connected Towers (연결된 타워)", "Skybridge Connected (스카이브릿지 연결)", "Underground Bunker (지하 벙커)", "Subterranean Level (지하층)", "Basement Courtyard (성큰/지하정원)", "Penthouse Level (펜트하우스)", "Rooftop Extension (옥상 증축)", "Mezzanine Floor (복층/메조닌)", "Split-level (스킵 플로어)", "Pilotis Structure (필로티 구조)", "Stilt House (고상 가옥)", "Floating House (수상 가옥)", "Treehouse (트리하우스)", "Suspended Structure (매달린 구조)", "Capsule Hotel (캡슐 호텔)", "Micro-apartment (마이크로 아파트)", "Loft Apartment (로프트)", "Duplex Unit (듀플렉스)", "Triplex Unit (트리플렉스)", "Courtyard House (중정형 주택)", "Atrium Building (아트리움 빌딩)", "Arcade Structure (아케이드)", "Colonnade Walkway (열주 회랑)", "Pagoda Tower (탑)", "Spire Top (첨탑)", "Dome Structure (돔)", "Pyramid Form (피라미드)", "Inverted Pyramid (역피라미드)", "Step-back Skyscraper (셋백 마천루)", "Spiral Tower (나선형 타워)", "Twisting Tower (비틀린 타워)", "Leaning Tower (기울어진 타워)", "Cantilevered Box (돌출된 박스)", "Stacked Boxes (쌓인 박스)", "Modular Stack (모듈러 스택)", "Bridge Building (교량형 건물)", "Gate Building (게이트형 건물)", "Tunnel Structure (터널형)", "Amphitheater Form (원형 극장형)", "Stadium Bowl (경기장 보울)", "Arena Dome (아레나 돔)", "Hangar Scale (격납고 규모)", "Warehouse Scale (창고 규모)", "Pavilion Scale (파빌리온 규모)", "Monumental Scale (기념비적 규모)"
    ],
    "form": [
        "Cubic Box (정육면체)", "Grid Structure (격자 구조)", "Stacked Boxes (쌓인 박스)", "Cantilevered (캔틸레버)", "Linear Mass (선형 매스)", "Waffle Structure (와플 구조)", "Intersecting Planes (교차하는 면)", "Slicing Planes (잘린 면)", "Monolithic Block (일체형 블록)", "Stacked Slabs (쌓인 슬래브)", "Bridging Mass (연결된 매스)", "Cantilevered Decks (돌출 데크)", "Interlocking Volumes (교차 매스)", "Hollow Cube (속이 빈 큐브)", "Nested Volumes (중첩된 볼륨)",
        "Pyramidal (피라미드형)", "Ziggurat (지구라트형)", "Dome Shell (돔 쉘)", "Vaulted Roof (볼트 지붕)", "Parabolic Arch (포물선 아치)", "Colonnade (열주)", "Triangular Prism (삼각기둥)", "Cylindrical (원통형)", "Conical (원뿔형)", "Octagonal (팔각형)", "Hexagonal (육각형)", "Terraced Step (계단식)",
        "Fluid Organic (유기적 곡선)", "Wave Form (파도형)", "Mushroom Shape (버섯형)", "Tree Shape (나무형)", "Cloud Shape (구름형)", "Dune Form (모래언덕형)", "Cateneray Curve (현수선 곡선)", "Voronoi Pattern (보로노이 패턴)", "Amorphous (무정형)", "Liquid Blob (액체 방울형)", "Jagged Rock (바위형)", "Honeycomb (벌집형)", "Lattice Shell (격자 껍질)", "Geodesic Sphere (지오데식 구)",
        "Twisted Spiral (나선형)", "Parametric Mesh (파라메트릭 메쉬)", "Fractal Geometry (프랙탈 기하학)", "Floating Slab (떠있는 슬래브)", "Exoskeleton (외골격 구조)", "Voxelated (복셀화된)", "Pixelated (픽셀화된)", "Fragmented (파편화된)", "Deformed Box (변형된 박스)", "Tilted Box (기울어진 박스)", "Ribbon Form (리본 형태)", "Helix Structure (나선 구조)", "Spherical (구형)", "Toroidal (도넛형)", "Mobius Strip (뫴비우스의 띠)", "Inflatable Form (팽창형)", "Tensile Membrane (인장 막)", "Crystalline (수정체형)", "Inverted Cone (역원뿔)"
    ],
    "detail": [
        "Louver System (루버)", "Solar Panels (태양광)", "Kinetic Facade (가변 파사드)", "Roof Garden (옥상 정원)", "Double Skin Facade (더블스킨)", "Perforated Screens (타공 스크린)",
        "Vertical Fins (수직 핀)", "Horizontal Brise-soleil (수평 차양)", "Wooden Lattice (목재 격자)", "Metal Mesh Curtain (메탈 메쉬 커튼)", "Media Facade (미디어 파사드)", "LED Strip Lights (LED 라인 조명)", "Exposed Trusses (노출 트러스)", "Space Frame (스페이스 프레임)", "Cable Stayed (사장 케이블)", "Flying Buttress (플라잉 버트레스)", "Gargoyles (가고일)", "Corinthian Columns (코린트식 기둥)", "Doric Columns (도리아식 기둥)", "Ionic Columns (이오니아식 기둥)", "Traditional Dancheong (단청)", "Korean Giwa (기와)", "Sliding Doors (슬라이딩 도어)", "Folding Doors (폴딩 도어)", "Pivot Doors (피벗 도어)", "French Windows (프랑스식 창)", "Bay Windows (베이 윈도우)", "Dormer Windows (도머 창)", "Skylights (천창)", "Clerestory Windows (고측창)", "Rose Window (장미창)", "Oculus (오큘러스/원형천창)", "Light Well (채광정)", "Spiral Staircase (나선형 계단)", "Floating Staircase (플로팅 계단)", "Glass Bridge (유리 다리)", "Infinity Edge (인피니티 엣지)", "Water Feature (수경 시설)", "Reflecting Pool (반사 연못)", "Fountain Jets (분수)", "Waterfall Cascade (인공 폭포)", "Green Balcony (녹색 발코니)", "Pocket Garden (포켓 정원)", "Sunken Garden (성큰 정원)", "Courtyard Tree (중정 나무)", "Rooftop Helipad (헬기 착륙장)", "Observation Deck (전망대)", "Glass Elevator (유리 엘리베이터)", "Escalator Void (에스컬레이터 보이드)", "Industrial Pipes (산업용 파이프)", "Exposed HVAC (노출 배관)", "Neon Signage (네온 사인)", "Holographic Projection (홀로그램)", "Biophilic Wall (식물 벽)", "Stone Gabion (돌망태)", "Decorative Moulding (몰딩 장식)", "Relief Carving (부조 조각)"
    ],
    "concept": [
        "Functionalism (기능주의)", "Efficiency (효율성)", "Urban Renewal (도시 재생)", "Smart City (스마트 시티)", "IoT Integrated (사물인터넷 통합)", "Minimalism (미니멀리즘)", "Gentrification (젠트리피케이션)", "Adaptive Reuse (재생 건축)", "Carbon Neutral (탄소 중립)", "Modular (모듈형)", "Prefabricated (조립식)", "Light-weight (경량화)", "Monolithic (일체형)", "High-Fidelity (고해상도)", "DIY Aesthetic (DIY 미학)",
        "Nostalgic (향수 어린)", "Timeless (초월적인)", "Monumental (기념비적)", "Iconic (상징적)", "Landmark (랜드마크)", "Zen Philosophy (젠 철학)", "Feng Shui (풍수지리)", "Wabi-sabi (와비사비)", "Hygge (휘게)", "Lagom (라곰)", "Handcrafted (수공예적)", "Spiritual (영적인)", "Noir Atmosphere (느와르)", "Maximalism (맥시멀리즘)", "Luxury (고급스러운)",
        "Symbiosis (공생)", "Sustainability (지속가능성)", "Regenerative (재생적인)", "Bionic Design (생체모방)", "Biomimicry (자연모방)", "Ethereal (천상계의)", "Whimsical (기발한)", "Serendipity (우연의 발견)", "Dreamscape (몽환적)", "Surrealism (초현실주의)",
        "Experimental (실험적인)", "Utopian (유토피아)", "Dystopian (디스토피아)", "Post-Apocalyptic (포스트 아포칼립스)", "Cybernetic (사이보그적)", "Metabolic (메타볼리즘)", "Anti-Gravity (반중력)", "Floating (부유하는)", "Aerodynamic (공기역학적)", "Hydrodynamic (유체역학적)", "Invisible (보이지 않는/투명한)", "Camouflage (위장)", "Ephemeral (일시적인)", "Pop-up (팝업/임시)", "Nomadic (유목적인)", "Glitch Art (글리치 아트)", "Low-Poly (로우폴리)", "Vaporwave (베이퍼웨이브)", "Retrofuturism (레트로 퓨처)", "Avant-garde (아방가르드)", "Ancient-Future (고전과 미래)", "Playful (장난스러운)"
    ],
    "season": [
        "Spring (봄)", "Summer (여름)", "Autumn (가을)", "Winter (겨울)", 
        "Early Spring (초봄)", "Spring Breeze (봄바람)", "Cherry Blossom Season (벚꽃 시즌)", "Late Spring (늦봄)", 
        "Early Summer (초여름)", "Mid-Summer (한여름)", "Summer Solstice (하지)", "Monsoon (장마)", "Rainy Season (우기)", "Late Summer (늦여름)", "Indian Summer (늦더위)", 
        "Early Autumn (초가을)", "Harvest Season (수확기)", "Autumn Equinox (추분)", "Golden Autumn (황금빛 가을)", "Falling Leaves (낙엽)", "Late Autumn (늦가을)", 
        "Early Winter (초겨울)", "Deep Winter (한겨울)", "Winter Solstice (동지)", "Snowy (눈 내리는)", "Thawing Season (해빙기)", 
        "Dry Season (건기)", "Hurricane Season (허리케인 시즌)", "Typhoon Season (태풍 시즌)", "Monsoon Rain (몬순 비)", 
        "Tropical Humid (열대 습기)", "Arid Dry (건조한)", "Mediterranean Summer (지중해 여름)", "Nordic Winter (북유럽 겨울)", "Alpine Winter (알프스 겨울)", 
        "Polor Night (극야)", "Midnight Sun (백야)"
    ],
    "weather": [
        "Clear Sky (맑음)", "Sunny with Clouds (구름 낀 맑음)", "Partly Cloudy (구름 조금)", "Cloudy (흐림)", "Overcast (잔뜩 흐림)", 
        "Mist (옅은 안개)", "Haze (연무)", "Foggy Season (안개)", "Thick Fog (짙은 안개)", "Humid (습한)", "Light Drizzle (가랑비)", "Shower (소나기)", "Sun Shower (여우비)", "Rainy (비오는)", "Heavy Rain (폭우)", "Pouring Rain (장대비)", "After the Rain (비 온 뒤)", 
        "Snow Flurries (눈발)", "Light Snow (가벼운 눈)", "Heavy Snowfall (폭설)", "Sleet (진눈깨비)", "Hailstorm (우박)", "Frost (서리)", "Glazed Frost (상고대)", "Black Ice (블랙 아이스)", "Melting Snow (녹는 눈)", 
        "Windy (바람부는)", "Gale Force Winds (강풍)", "Stormy (폭풍우)", "Thunderstorm (뇌우)", "Lightning Strike (번개)", "Rolling Thunder (천둥)", "Tornado (토네이도)", "Dust Storm (모래폭풍)", "Sandstorm (황사)", "Volcanic Ash (화산재)", "Acid Rain (산성비)", 
        "Rainbow (무지개)", "Double Rainbow (쌍무지개)", "God Rays (빛내림)", "Tyndall Effect (틴달 현상)", "Dramatic Sky (드라마틱한 하늘)", "Gloomy (우울한 날씨)", "Heat Haze (아지랑이)", "Aurora Borealis (오로라)", "Starry Night (별밤)"
    ],
    "time": [
        "Golden Hour (골든아워)", "Blue Hour (블루아워)", "Magic Hour (매직 아워)",
        "Before Dawn (동트기 전)", "Dawn Mist (새벽 안개)", "First Light (여명)", "Sunrise (일출)", "Early Morning (이른 아침)", "Morning Haze (아침 안개)", 
        "Late Morning (늦은 아침)", "High Noon (정오)", "Midday Sun (한낮)", "Overhead Sun (머리 위 태양)", "Mid-Afternoon (오후 중반)", 
        "Late Afternoon (늦은 오후)", "Long Shadows (긴 그림자)", "Sunset (일몰)", "Twilight (황혼)", "Evening (저녁)", "Evening Glow (저녁 노을)", 
        "Night (밤)", "City Lights (도시 조명)", "Midnight (자정)", "Deep Night (심야)", 
        "Moonlight (달빛)", "Starlight (별빛)", "Full Moon (보름달)", "White Night (백야)", "Solar Eclipse Time (일식)", "Rush Hour (혼잡 시간)", "Quiet Hours (고요한 시간)"
    ],
    "mood": [
        "Serene (평온한)", "Peaceful (평화로운)", "Tranquil (고요한)", "Warm/Cozy (포근한)", "Inviting (초대하는)", "Joyful (즐거운)", "Hopeful (희망찬)", "Relaxing (편안한)", "Zen (선적인)", "Meditative (명상적인)",
        "Dynamic (역동적인)", "Busy (바쁜)", "Crowded (붐비는)", "Festive (축제 분위기)", "Chaotic (혼란스러운)", "Hectic (정신없는)", "Tense (긴장감 넘치는)",
        "Cinematic (영화 같은)", "Dramatic (극적인)", "Romantic (낭만적인)", "Nostalgic (향수 어린)", "Melancholic (우울한)", "Lonely (외로운)", "Dreamy (몽환적인)", "Ethereal (천상계의)", "Mysterious Noir (느와르)",
        "Majestic (장엄한)", "Grand (거대한)", "Epic (웅장한)", "Luxurious (고급스러운)", "Elegant (우아한)", "Sophisticated (세련된)", "Monumental (기념비적)",
        "Cold/Futuristic (미래적인)", "Sci-Fi (공상과학)", "Cyberpunk (사이버펑크)", "Dystopian (디스토피아)", "Post-Apocalyptic (종말 후)", "Spooky (으스스한)", "Eerie (기괴한)", "Haunted (유령이 나올 듯한)", "Bleak (암울한)", "Desolate (황량한)", "Sterile (살균된/차가운)", "Grungy (그런지한)"
    ],
    "land": [
        "Manicured Lawn (잔디밭)", "English Garden (영국식 정원)", "French Garden (프랑스식 정원)", "Japanese Garden (일본식 정원)", "Zen Rock Garden (젠 정원)", "Roof Garden (옥상 정원)", "Vertical Garden (수직 정원)", "Green Wall (벽면 녹화)", "Topiary (토피어리)", "Bonsai Trees (분재)", 
        "Korean Traditional Garden (한국 전통 정원)", "Madang Courtyard (마당/중정)", "Huwon Secret Garden (후원/비원)", 
        "Onggi Jar Platform (장독대)", "Lotus Pond (연꽃 연못/연지)", "Stone Pagoda Landscape (석탑 조경)", 
        "Pavilion on Hill (정자)", "Stone Wall Path (돌담길)",
        "Forest (숲)", "Pine Trees (소나무)", "Birch Forest (자작나무 숲)", "Bamboo Grove (대나무 숲)", "Ginkgo Trees (은행나무)", "Maple Trees (단풍나무)", "Cherry Blossoms (벚꽃)", "Palm Trees (야자수)", "Jungle (정글)", "Rainforest (열대우림)", "Mangrove (맹그로브)", 
        "Korean Red Pine (적송/소나무)", "Zelkova Tree (느티나무/정자나무)", "Persimmon Tree (감나무)", 
        "Magnolia Trees (목련)", "Acacia Forest (아카시아 숲)",
        "Meadow (목초지)", "Wildflowers (야생화)", "Sunflower Field (해바라기 밭)", "Lavender Field (라벤더 밭)", "Tulip Garden (튤립 정원)", "Rose Garden (장미 정원)", "Silver Grass (억새)", "Rice Paddy (논)", "Vineyard (포도원)", "Orchard (과수원)",
        "Azalea Hill (진달래/철쭉 언덕)", "Forsythia Bushes (개나리)", "Canola Flower Field (유채꽃밭)", 
        "Buckwheat Field (메밀꽃밭)", "Cosmos Trail (코스모스 길)", "Reed Field (갈대밭)",
        "Infinity Pool (인피니티 풀)", "Koi Pond (잉어 연못)", "Lily Pads (수련)", "Stream (개울)", "River (강)", "Lake (호수)", "Wetland (습지)", "Ocean (바다)", "Beach (해변)", "Waterfall (폭포)", 
        "Mountain (산)", "Hill (언덕)", "Valley (계곡)", "Cliff (절벽)", "Cave (동굴)", "Mossy Rocks (이끼 바위)", "Cactus Garden (선인장)", "Desert Flora (사막 식물)", "Savanna (사바나)", "Tundra (툰드라)", "Glacier (빙하)", "Volcano (화산)"
    ],
    "road": [
        "Asphalt Road (아스팔트 도로)", "8-lane Boulevard (8차선 대로)", "City Street (시내 도로)", "Intersection (교차로)", "Roundabout (회전교차로)", "Crosswalk (횡단보도)", "Bus Lane (버스 전용차로)", "Taxi Stand (택시 승강장)", 
        "Pedestrian Plaza (광장)", "Sidewalk (보도)", "Cobblestone Alley (자갈 골목)", "Brick Road (벽돌 길)", "Stone Pavers (석재 포장)", "Wooden Boardwalk (목재 산책로)", "Waterfront Promenade (산책로)", "Shopping Arcade (상가 거리)", "Market Street (시장 거리)", 
        "Highway (고속도로)", "Freeway (고속화도로)", "Overpass (고가도로)", "Underpass (지하차도)", "Tunnel (터널)", "Bridge (다리)", "Suspension Bridge (현수교)", "Train Tracks (기찻길)", "Tram Line (트램 거리)", "Monorail Track (모노레일)", 
        "Dirt Road (비포장 도로)", "Gravel Path (자갈 길)", "Sand Path (모래 길)", "Muddy Track (진흙 길)", "Forest Trail (숲길)", "Mountain Path (산길)", "Hiking Trail (등산로)", "Coastal Road (해안 도로)", "Winding Road (구불구불한 길)", "Scenic Route (경치 좋은 길)"
    ],
    "car": [
        "Modern Electric Car (전기차)", "Luxury Sedan (고급 세단)", "SUV (SUV)", "Sports Car (스포츠카)", "Convertible (컨버터블)", "Pickup Truck (픽업트럭)", "Compact Car (경차)", 
        "Public Bus (버스)", "Double-decker Bus (2층 버스)", "School Bus (스쿨버스)", "Taxi (택시)", "Police Car (경찰차)", "Ambulance (구급차)", "Fire Truck (소방차)", "Delivery Van (배송 밴)", "Food Truck (푸드트럭)", 
        "Bicycle (자전거)", "E-Bike (전기 자전거)", "Motorcycle (오토바이)", "Scooter (스쿠터)", "Kickboard (킥보드)", "Segway (세그웨이)", "Rickshaw (인력거)", "Tuk-tuk (툭툭)", 
        "Camper Van (캠핑카)", "RV (캠핑카)", "Classic Vintage Car (클래식카)", "Golf Cart (골프 카트)", "Construction Truck (공사 트럭)", "Excavator (굴착기)", "Tractor (트랙터)", 
        "Self-driving Shuttle (자율주행)", "Flying Taxi (플라잉 택시/UAM)", "Drone (드론)", "Futuristic Pod (미래형 포드)", "Hovercraft (호버크래프트)", "Boat (보트)", "Yacht (요트)", "No Vehicles (차량 없음)"
    ],
    "den": [
        "No people (사람 없음)", "Sparse silhouettes (드문 실루엣)", "Single figure (한 명)", "Couple (커플)", "Small Group (소규모 그룹)", "Family (가족)", "Crowded (붐비는)", "Diverse Crowd (다양한 군중)", "Blurred Figures (흐릿한 인물)", "Silhouettes (실루엣)", 
        "Business professionals (직장인들)", "Students (학생)", "Tourists (관광객)", "Shoppers (쇼핑객)", "Diners (식사하는 사람들)", "Commuters (통근자)", 
        "Children (아이들)", "Teenagers (십대)", "Elderly (노인)", 
        "Architects (건축가)", "Engineers (엔지니어)", "Workers (노동자)", "Police Officers (경찰)", 
        "Artists (예술가)", "Musicians (음악가)", "Street Performers (거리 공연자)", "Fashion Models (패션 모델)", 
        "Cyberpunks (사이버펑크족)", "Robots (로봇)", "Androids (안드로이드)", "Aliens (외계인)", "Ghosts (유령)", "Shadows (그림자)"
    ],
    "act": [
        "standing (서 있는)", "waiting (기다리는)", "queuing (줄 서 있는)", "sitting on benches (벤치에 앉은)", "lying down (누워 있는)", "sleeping (자고 있는)", "leaning (기대어 있는)", "looking up (올려다보는)", "reading (읽고 있는)", "checking phone (폰 보는)", 
        "walking by (지나가는)", "strolling (산책하는)", "wandering (배회하는)", "jogging (조깅하는)", "running (달리는)", "sprinting (전력질주하는)", "cycling (자전거 타는)", "skating (스케이트 타는)", 
        "talking (대화하는)", "laughing (웃는)", "arguing (말다툼하는)", "hugging (포옹하는)", "kissing (키스하는)", "holding hands (손잡고 있는)", "waving (손 흔드는)", "cheering (환호하는)", 
        "taking photos (사진 찍는)", "taking selfie (셀카 찍는)", "eating (먹는)", "drinking (마시는)", "shopping (쇼핑하는)", "working (일하는)", "selling (파는)", "playing music (연주하는)", "dancing (춤추는)", "painting (그림 그리는)", "walking dog (개 산책시키는)"
    ],
    "rep": [
        "Hyper-realistic Photo (극사실 사진)", "3D Render (3D 렌더)", "White Model (화이트 모델)", "Clay Render (클레이 렌더)", "Architectural Photography (건축 사진)", 
        "Watercolor (수채화)", "Oil Painting (유화)", "Acrylic Painting (아크릴화)", "Pencil Sketch (연필 스케치)", "Charcoal Sketch (숯 드로잉)", "Pen and Ink (펜화)", "Marker Sketch (마카 스케치)", "Colored Pencil (색연필화)", "Ink Wash Painting (수묵화)", "Impressionism (인상파)", 
        "Digital Painting (디지털 페인팅)", "Concept Art (컨셉 아트)", "Matte Painting (매트 페인팅)", "Vector Art (벡터 아트)", "Pixel Art (픽셀 아트)", "Voxel Art (복셀 아트)", "Low Poly Art (로우 폴리)", "Anime Style (애니메이션 스타일)", "Studio Ghibli Style (지브리 스타일)", "Cyberpunk Style (사이버펑크 스타일)", 
        "Blueprint (청사진)", "Technical Drawing (기술 도면)", "Section Cut (단면도)", "Exploded Axonometric (분해 액소노메트릭)", "Elevation View (입면도)", "Plan View (평면도)", "Wireframe (와이어프레임)", "Point Cloud (점군 데이터)", "Thermal Imaging (열화상)", "X-Ray View (엑스레이)"
    ],
    "motion": [
        "Still Life (정적인)", "Frozen in Time (시간 정지)", "Long Exposure (장노출)", 
        "Time-lapse (타임랩스)", "Hyper-lapse (하이퍼랩스)",
        "Panning Shot (패닝 샷)", "Smooth Pan (부드러운 팬)", "Whip Pan (휩 팬)", 
        "Zoom Burst (줌 버스트)", "Dolly Zoom (돌리 줌)", "Vertigo Effect (버티고 효과)", "Rack Focus (초점 이동)", 
        "Tilt Down (틸트 다운)", "Tilt Up (틸트 업)", "Tracking Shot (트래킹 샷)", "Crab Shot (크랩 샷)", "Arc Shot (아크 샷)", 
        "Crane Shot (크레인 샷)", "Drone Flyover (드론 비행)", "Handheld Look (핸드헬드)", "Camera Shake (카메라 흔들림)", "Stabilized (안정된)", "Cinematic Flow (영화적 흐름)",
        "Dynamic Movement (역동적)", "Slow Motion (슬로우 모션)", "High Speed Photography (고속 촬영)", 
        "Walking Motion (걷는 동작)", "Running Motion (달리는 동작)", "Jumping (점프하는)", "Flying (나는)", "Falling (떨어지는)", 
        "Dancing Motion (춤추는 동작)", "Fighting Motion (싸우는 동작)", "Driving Motion (운전하는 동작)", 
        "Traffic Flow (교통 흐름)", "Crowd Movement (군중의 이동)", "Spinning (회전하는)",
        "Motion Blur (모션 블러)", "Light Trails (빛의 궤적)", "Star Trails (별의 궤적)", 
        "Water Flow (흐르는 물)", "Rippling (물결)", "Splashing (튀기는 물)", 
        "Cloud Movement (구름의 이동)", "Wind Blown (바람에 날리는)", "Leaves Blowing (날리는 나뭇잎)", 
        "Fabric Flowing (휘날리는 천)", "Hair Blowing (날리는 머리카락)", "Floating Dust (떠다니는 먼지)", 
        "Falling Rain (내리는 비)", "Falling Snow (내리는 눈)", 
        "Explosion (폭발)", "Shattering (산산조각)", "Vibrating (진동하는)"
    ],
    "engine": [
        "Unreal Engine 5.4", "Unreal Engine 5.5", "Unity 6", "Unity HDRP", "CryEngine", "NVIDIA Omniverse", 
        "Octane Render 8K", "V-Ray 6", "Corona Render", "Redshift", "Arnold Render", "Maxwell Render", "Keyshot", "Cycles (Blender)", 
        "Lumion 2024", "Twinmotion", "Enscape", "D5 Render", 
        "Midjourney V6.1", "Stable Diffusion XL", "Stable Diffusion 3", "DALL-E 3", "Adobe Firefly", "Magnific AI", 
        "Blender Eevee", "WebGL", "Three.js"
    ],
    "view": [
        "Eye-level (눈높이)", "Human Eye View (사람 시점)", "Street Level (거리 높이)", 
        "Low Angle (로우 앵글)", "Worm's-eye (앙시도)", "High Angle (하이 앵글)", "Bird's-eye (조감도)", "Aerial View (항공 뷰)", "Drone Shot (드론 샷)", "Satellite View (위성 뷰)", "Top-Down (수직 부감)", 
        "Isometric (아이소)", "Perspective (투시도)", "One-point Perspective (1소점)", "Two-point Perspective (2소점)", "Elevation (입면)", "Sectional View (단면 뷰)", 
        "Wide-angle (광각)", "Fish-eye (어안 렌즈)", "Panoramic (파노라마)", "360 Degree (360도)", "Close-up (클로즈업)", "Macro Shot (접사)", "Over-the-Shoulder (오버 더 숄더)", "POV (1인칭 시점)", 
        "Dutch Angle (더치 앵글/기울기)", "Silhouette View (실루엣 뷰)", "Reflection View (반사 뷰)", "Framed View (프레임 뷰)", "Through the Window (창문 너머)"
    ],
    "lens": [
        "35mm Lens (표준 광각)", "50mm Lens (표준)", "85mm Lens (인물용)", 
        "14mm Lens (초광각)", "16mm Lens (초광각)", "24mm Lens (광각)", "Wide-angle Zoom (광각 줌)", 
        "70mm Lens (준망원)", "100mm Lens (망원)", "135mm Lens (망원)", "200mm Lens (장망원)", "Telephoto Zoom (망원 줌)", 
        "Macro Lens (매크로)", "Fish-eye Lens (어안)", "Tilt-shift Lens (틸트시프트)", "Anamorphic Lens (아나모픽)", "Cine Lens (시네마)", 
        "f/1.8 (얕은 심도)", "f/2.8 (적당한 심도)", "f/8.0 (깊은 심도)", "Shallow Depth of Field (아웃포커싱)", "Deep of Field (팬포커스)", "Bokeh Effect (보케)", 
        "Lens Flare (렌즈 플레어)", "Chromatic Aberration (색수차)", "Vignetting (비네팅)", "ISO 100 (저감도/깨끗함)", "ISO 3200 (그레인)"
    ],
    "light": [
        "Natural Sunlight (자연광)", "Direct Sunlight (직사광)", "Diffused Light (확산광)", "Moonlight (달빛)", "Starlight (별빛)", 
        "Golden Hour (골든아워)", "Blue Hour (블루아워)", "Warm Interior Glow (내부 조명)", "God Rays (빛내림)", "Volumetric Rays (틴달 현상)", "Atmospheric Perspective (대기 원근법)", 
        "Neon Lights (네온)", "Streetlight (가로등)", "LED Light (LED)", "Fluorescent Light (형광등)", "Floodlight (투광 조명)", "Spotlight (스포트라이트)", 
        "Soft Light (부드러운 빛)", "Hard Light (강한 빛)", "Rim Light (림 라이트/후광)", "Backlight (역광)", "Sidelight (측광)", "Softbox (소프트박스)", "Rembrandt Lighting (렘브란트 조명)", "Cinematic Lighting (영화 조명)", "Dramatic Chiaroscuro (명암대비)", 
        "Bioluminescence (생체 발광)", "Firelight (불빛)", "Candlelight (촛불)", "Laser Light (레이저)", "Glow in the Dark (야광)"
    ],
    "ratio": [
        "--ar 16:9 (Standard)", "--ar 3:2 (Photo)", "--ar 4:3 (Traditional)", "--ar 2:1 (Wide)", "--ar 2.35:1 (Cinema)", "--ar 32:9 (Super Wide)",
        "--ar 9:16 (Story)", "--ar 2:3 (Portrait)", "--ar 3:4 (Social)", "--ar 4:5 (Insta)", "--ar 1:2 (Tall)", 
        "--ar 1:1 (Square)", 
        "--ar 16:10", "--ar 1.85:1", "--ar 1.43:1 (IMAX)"
    ]
};


// 2. 데이터 제공 API (화면 그리기용)
app.get('/api/data', (req, res) => {
    res.json(DATA_SHEET);
});

// 3. 프롬프트 생성 API (핵심 기술)
app.post('/api/generate', (req, res) => {
    const v = req.body; // 클라이언트가 보낸 선택값들

    // 서버 내부에서 프롬프트 조립 (사용자는 이 로직을 볼 수 없음)
    const getVal = (key) => v[key] ? v[key].replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "").replace(/[()]/g, "").trim() : "";

    let mainSentence = `A ${getVal('s14') || 'Architectural view'} of a ${getVal('s5')} ${getVal('s3')} ${getVal('s4')}`;
    let contextDesc = `designed with ${getVal('s6')} material and ${getVal('s8')} form, featuring ${getVal('s23')} details.`;
    let locDesc = `The scene is located in ${getVal('s0')} ${getVal('s1')}, sited ${getVal('s2')}, surrounded by ${getVal('s19')}.`;
    let atmosphere = `The weather is ${getVal('s10')} in ${getVal('s21')} season at ${getVal('s9')}. The atmosphere is ${getVal('s11')} with ${getVal('s17')} lighting.`;
    
    const qualityTags = [
        "Best Quality", "Masterpiece", "8k Resolution", "Hyper Detailed", 
        getVal('s15'), getVal('s22'), getVal('s16'), getVal('s18')
    ].filter(t => t && t.trim() !== "").join(", ");

    let finalPrompt = `${mainSentence}, ${contextDesc} ${locDesc} ${atmosphere} \n\n[Details]: ${qualityTags}`;
    finalPrompt = finalPrompt.replace(/\s+/g, ' ').replace(/\s,\s/g, ', ').replace(/\.\s\./g, '.').trim();

    res.json({ result: finalPrompt });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 돌아가고 있습니다!`);
});
