const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js'); // 패키지 필요
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔐 Supabase Admin 설정 (Render 환경변수 필수: SUPABASE_SERVICE_ROLE_KEY)
const sbAdmin = createClient(
    process.env.SUPABASE_URL || 'https://oitqyfqzocjmubqmvzfw.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY // 마스터 비밀 키
);

// ==========================================================================
// 1. DATA_SHEET (전체 데이터 풀 - 누락 없음)
// ==========================================================================
const DATA_SHEET = {
    "config": { "masters": [] },
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
        "1.단독주택": ["Detached House (단독주택)", "Multi-unit House (다중주택/하숙)", "Multi-household House (다가구주택/원룸)", "Official Residence (공관)"],
        "2.공동주택": ["Apartment Complex (아파트 단지)", "Row House (연립주택/빌라 4층이하)", "Multi-family House (다세대주택/빌라)", "Dormitory (기숙사)"],
        "3.제1종근린생활시설": ["Supermarket (슈퍼마켓/소매점)", "Convenience Store (편의점)", "Bakery (제과점)", "Cafe/Tea House (휴게음식점)", "Hair Salon (미용원)", "Bathhouse (목욕장)", "Laundry Shop (세탁소)", "Medical Clinic (의원)", "Dental Clinic (치과의원)", "Oriental Medicine Clinic (한의원)", "Community Center (마을회관)", "Police Sub-station (파출소)", "Fire Station (소방서)", "Post Office (우체국)", "Public Library (공공도서관)"],
        "4.제2종근린생활시설": ["General Restaurant (일반음식점)", "Small Theater (소극장/공연장)", "Religious Assembly (작은 교회/성당)", "Academy/Hagwon (학원)", "PC Room (PC방)", "Billiards Hall (당구장)", "Real Estate Agency (부동산중개소)", "General Office (일반사무소)", "Karaoke/Noraebang (노래연습장)", "Screen Golf Range (스크린골프장)", "Fitness Center (체력단련장)", "Gosiwon (고시원/다중생활시설)"],
        "5.문화및집회시설": ["Concert Hall (대형 공연장)", "Opera House (오페라 하우스)", "Wedding Hall (예식장)", "Convention Center (회의장/컨벤션)", "Racecourse (경마장)", "Art Gallery (미술관)", "Museum (박물관)", "Science Museum (과학관)", "Zoo (동물원)", "Botanical Garden (식물원)", "Aquarium (수족관)"],
        "6.종교시설": ["Large Church (대형 교회)", "Cathedral (성당)", "Buddhist Temple (사찰)", "Religious Shrine (제실/사당)", "Enshrining Hall (봉안당)"],
        "7.판매시설": ["Wholesale Market (도매시장)", "Traditional Market (전통시장)", "Department Store (백화점)", "Shopping Mall (쇼핑센터)", "Large Hypermarket (대형마트)"],
        "8.운수시설": ["Bus Terminal (버스터미널)", "Railway Station (철도역)", "Subway Station (지하철역)", "Airport Terminal (공항 터미널)", "Ferry Terminal (여객부두)", "Logistics Warehouse (물류창고/터미널)"],
        "9.의료시설": ["General Hospital (종합병원)", "University Hospital (대학병원)", "Nursing Hospital (요양병원)", "Mental Hospital (정신병원)", "Isolation Hospital (격리병원)"],
        "10.교육연구시설": ["Kindergarten (유치원)", "Elementary School (초등학교)", "High School (중/고등학교)", "University Campus (대학교)", "Training Institute (연수원)", "Research Center (연구소)", "Large Library (대형 도서관)"],
        "11.노유자시설": ["Daycare Center (어린이집)", "Orphanage (아동복지시설)", "Nursing Home (노인요양시설)", "Senior Welfare Center (노인복지관)", "Social Welfare Center (사회복지관)"],
        "12.수련시설": ["Youth Training Center (청소년수련관)", "Youth Hostel (유스호스텔)", "Training Camp (수련원/캠프)"],
        "13.운동시설": ["Indoor Gymnasium (실내체육관)", "Large Stadium (경기장/스타디움)", "Swimming Pool (수영장)", "Bowling Alley (볼링장)", "Tennis Court (테니스장)"],
        "14.업무시설": ["City Hall (시청/구청)", "Police Headquarters (경찰서 본서)", "Tax Office (세무서)", "Office Skyscraper (고층 오피스 빌딩)", "Company Headquarters (사옥)", "Officetel (오피스텔)"],
        "15.숙박시설": ["Luxury Hotel (관광호텔)", "Business Hotel (비즈니스호텔)", "Resort Condominium (콘도/리조트)", "Hanok Hotel (한옥 호텔)", "Hostel (호스텔)"],
        "16.위락시설": ["Nightclub (나이트클럽/유흥주점)", "Casino (카지노)", "Amusement Park (유원지 시설)", "Dance Hall (무도장)"],
        "17.공장": ["General Factory (일반 공장)", "Manufacturing Plant (제조 공장)", "Food Processing Plant (식품 공장)", "Knowledge Industry Center (지식산업센터/아파트형공장)"],
        "18.창고시설": ["Large Warehouse (일반창고)", "Cold Storage (냉동/냉장창고)", "Logistics Center (물류센터)", "Container Yard (컨테이너 야적장)"],
        "19.위험물저장및처리": ["Gas Station (주유소)", "LPG Charging Station (LPG 충전소)", "Hydrogen Station (수소충전소)", "Oil Storage Tank (유류 저장소)", "Chemical Plant (화학 공장)"],
        "20.자동차관련시설": ["Parking Tower (주차타워/빌딩)", "Car Wash Center (대형 세차장)", "Car Repair Shop (정비공장)", "Junkyard (폐차장)", "Driving School (운전학원)"],
        "21.동물및식물관련시설": ["Livestock Barn (축사)", "Slaughterhouse (도축장)", "Large Greenhouse (대형 온실)", "Vertical Farm (스마트팜/수직농장)"],
        "22.자원순환관련시설": ["Sewage Treatment Plant (하수처리장)", "Recycling Center (고물상/재활용센터)", "Waste Incinerator (쓰레기 소각장)"],
        "23.교정및군사시설": ["Prison (교도소)", "Detention Center (구치소)", "Military Barracks (군부대 막사)", "Military Bunker (군사 벙커)"],
        "24.방송통신시설": ["Broadcasting Station (방송국)", "Radio Station (라디오 방송국)", "Data Center (데이터센터/IDC)", "Telecom Tower Building (통신국)"],
        "25.발전시설": ["Power Plant (화력/원자력 발전소)", "Solar Power Plant (태양광 발전소)", "Wind Farm (풍력 발전 단지)"],
        "26.묘지관련시설": ["Crematorium (화장장)", "Ossuary (납골당/봉안당)", "Cemetery Chapel (묘지 예배당)"],
        "27.관광휴게시설": ["Outdoor Amphitheater (야외 음악당)", "Observatory Tower (전망 타워)", "Highway Rest Area (고속도로 휴게소)"],
        "28.장례시설": ["Funeral Home (장례식장)", "Pet Funeral Hall (동물 장례식장)"],
        "29.야영장시설": ["Camping Site (일반 야영장)", "Auto Camping Site (자동차 야영장)", "Glamping Site (글램핑장)"]
    },
    "style": [
        "Minimalist (미니멀리즘)", "International Style (국제주의 양식)", "Bauhaus (바우하우스)", "Mid-Century Modern (미드센추리 모던)", "Industrial Chic (인더스트리얼 시크)", "Postmodernism (포스트모더니즘)", "Deconstructivist (해체주의)", "Tiny House Movement (타이니 하우스)", "Shipping Container (컨테이너 건축)", "Le Corbusier Style (르 코르뷔지에 스타일)", "Tadao Ando Style (안도 타다오 스타일)", "Frank Gehry Style (프랭크 게리 스타일)",
        "Traditional Hanok (전통 한옥)", "Traditional Japanese (전통 일본식)", "Traditional Chinese (전통 중국식)", "Neoclassical (신고전주의)", "Renaissance (르네상스)", "Baroque (바로크)", "Rococo (로코코)", "Gothic Revival (고딕 리바이벌)", "Romanesque (로마네스크)", "Byzantine (비잔틴)", "Islamic Architecture (이슬람 양식)", "Art Nouveau (아르누보)", "Art Deco (아트데코)", "Victorian (빅토리아 양식)", "Edwardian (에드워디안)", "Tudor Style (튜더 양식)", "Colonial Style (식민지 양식)", "Craftsman (크래프츠맨)", "Prairie Style (프레리 양식)", "Mediterranean (지중해식)", "Scandivavian (북유럽식)", "Vernacular (토속 건축)", "Rustic Cabin (러스틱 캐빈)", "Brutalist (브루탈리즘)", "Constructivism (구성주의)",
        "Organic Architecture (유기적 건축)", "Biophilic (바이오필릭)", "Eco-Brutalism (에코 브루탈리즘)", "Sustainable Design (지속가능 디자인)", "Blobitecture (블롭 건축)", "Earthship (어스십)", "Vertical Farm (수직 농장)", "Zaha Hadid Style (자하 하디드 스타일)",
        "Cyberpunk (사이버펑크)", "Futurism (퓨처리즘)", "Neo-Futurism (네오 퓨처리즘)", "Parametric (파라메트릭)", "Metabolism (메타볼리즘)", "High-Tech (하이테크)", "Space Age (스페이스 에이지)", "Steampunk (스팀펑크)", "Solarpunk (솔라펑크)", "Dieselpunk (디젤펑크)", "Atomic Age (아토믹 에이지)", "Googie Architecture (구기 건축)", "Modular Prefab (모듈러 프리패브)", "Geodesic Dome (지오데식 돔)", "Floating Architecture (수상 건축)"
    ],
    "mat": [
        "Exposed Concrete (노출 콘크리트)", "Board-marked Concrete (송판 노출 콘크리트)", "Microcement (마이크로 시멘트)", "Washed Aggregate (콩자갈 노출미장)", "Curtain Wall Glass (커튼월)", "White Stucco (화이트 스타코)", "Polished Steel (폴리싱 스틸)", "Brushed Aluminum (헤어라인 알루미늄)", "Anodized Aluminum (아노다이징 알루미늄)", "Mirror Polished Stainless Steel (슈퍼 미러 스텐)", "Blackened Steel (흑철판)",
        "Frosted Glass (반투명 유리)", "Glass Block (유리 블록)", "Ribbed Glass (고엽 유리)", "Fluted Glass (플루티드 유리)", "U-Profile Glass (U형 유리)", "Cracked Glass (크랙 유리)", "Wired Glass (망입 유리)", "Acid-etched Glass (에칭 유리)", "Reflective Mirror Glass (반사 유리)", "Plywood (합판)", "Birch Plywood Edge (자작나무 합판 단면)", "OSB Board (OSB 합판)", "Recycled Plastic (재활용 플라스틱)", "Ceramic Tile (세라믹 타일)", "Sintered Stone (박판 세라믹)", "Asphalt Shingle (아스팔트 슁글)",
        "Red Brick (붉은 벽돌)", "Exposed Brickwork (파벽돌)", "Glazed Brick (유약 벽돌)", "Marble (대리석)", "Limestone (라임스톤)", "Travertine (트래버틴)", "Silver Travertine (실버 트래버틴)", "Sandstone (샌드스톤)", "Granite (화강암)", "Rough-cut Granite (혹두기 화강암)", "Basalt (현무암)", "Slate (슬레이트)", "Slate Stack Stone (슬레이트 석재 쌓기)", "Obsidian (흑요석)", "White Onyx (화이트 오닉스)", "Terrazzo (테라조)", "Volcanic Scoria (화산사)",
        "Copper Patina (녹청 구리)", "Bronze (청동)", "Brass (황동)", "Gold Leaf (금박)", "Champagne Gold Metal (샴페인 골드 금속)", "Rammed Earth (다짐 흙)", "Adobe Mud (어도비 흙벽)", "Thatch Roof (초가지붕)", "Korean Giwa (기와)", "Rice Paper (한지)", "Wattle and Daub (외엮기)", "Charred Wood (탄화목)", "Weathered Barn Wood (고재)", "Shou Sugi Ban (탄화목)", "Corten Steel (코르텐강)", "Oxidized Iron (산화 철판)", "Zinc Cladding (징크 마감)", "Titanium Zinc (티타늄 징크)", "Corrugated Metal (골함석)", "Galvanized Steel (용융아연도금 강판)", "Mosaic Tile (모자이크 타일)", "Terracotta Louver (테라코타 루버)", "Gabion Wall (돌망태)",
        "CLT Timber (구조용 목재)", "Timber Batten (목재 루버)", "Bamboo (대나무)", "Rattan (라탄)", "Cork (코르크)", "Teak Wood (티크)", "Walnut Wood (월넛)", "Oak Wood (오크)", "Ipe Decking (이페 데크)", "Cedar Shingle (적삼목 슁글)", "Green Wall (수직 정원)", "Moss Wall (이끼 벽)", "Myceium Brick (균사체 벽돌)", "Hempcrete (헴프크리트)",
        "Titanium Panel (티타늄 패널)", "Carbon Fiber (카본 파이버)", "Fiberglass (유리섬유)", "Smart Glass (스마트 글라스)", "Dichroic Glass (다이크로익 유리)", "Dichroic Film (다이크로익 필름)", "Photovoltaic Glass (태양광 유리)", "Polycarbonate (폴리카보네이트)", "ETFE Pillow (ETFE 막)", "Tensile Fabric (인장 막)", "Perforated Metal (타공 금속)", "Wire Mesh (와이어 메쉬)", "Expanded Metal (익스펜디드 메탈)", "Stained Glass (스테인드 글라스)",
        "Lime Wash (라임 워시)", "Venetian Plaster (베네치안 플라스터)", "Tadelakt (타델락트)", "Liquid Metal Coating (액체 금속 코팅)", "3D Printed Concrete (3D 프린팅 콘크리트)", "Translucent Concrete (투과형 콘크리트)", "Acoustic Panel (흡음 패널)", "Felt Wall (펠트 벽)", "Rubber Flooring (고무 바닥재)"
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
    "nature_density": [
        "No Plants (식재 없음/인공적)",
        "Sparse Potted Plants (드문드문한 화분)",
        "Manicured Garden (잘 정돈된 정원)",
        "Street Trees & Lawn (가로수와 잔디)",
        "Lush Vegetation (무성한 식생/친환경)",
        "Overgrown Jungle (뒤덮인 정글/폐허)",
        "Vertical Gardens everywhere (수직 정원 도배)"
    ],
    "people_density": [
        "No People (사람 없음/고요함)",
        "Solitary Figure (단 한 명/스케일감)",
        "Sparse Pedestrians (한산한 거리)",
        "Casual Groups (일상적인 인파)",
        "Bustling Crowd (북적이는 인파/상업지)",
        "Packed Sea of People (인산인해/축제)"
    ],
    "vehicle_density": [
        "No Cars (차량 없음/보행자 전용)",
        "Few Parked Cars (주차된 차 소수)",
        "Light Traffic (원활한 흐름)",
        "Busy City Traffic (분주한 도심)",
        "Traffic Jam (교통 체증/혼잡)",
        "Motion Blur Cars (역동적인 차량 흐름)",
        "Flying Traffic (비행 차량/SF)"
    ],
    "act": [
        "standing (서 있는)", "waiting (기다리는)", "queuing (줄 서 있는)", "sitting on benches (벤치에 앉은)", "lying down (누워 있는)", "sleeping (자고 있는)", "leaning (기대어 있는)", "looking up (올려다보는)", "reading (읽고 있는)", "checking phone (폰 보는)", 
        "walking by (지나가는)", "strolling (산책하는)", "wandering (배회하는)", "jogging (조깅하는)", "running (달리는)", "sprinting (전력질주하는)", "cycling (자전거 타는)", "skating (스케이트 타는)", 
        "talking (대화하는)", "laughing (웃는)", "arguing (말다툼하는)", "hugging (포옹하는)", "kissing (키스하는)", "holding hands (손잡고 있는)", "waving (손 흔드는)", "cheering (환호하는)", 
        "taking photos (사진 찍는)", "taking selfie (셀카 찍는)", "eating (먹는)", "drinking (마시는)", "shopping (쇼핑하는)", "working (일하는)", "selling (파는)", "playing music (연주하는)", "dancing (춤추는)", "painting (그림 그리는)", "walking dog (개 산책시키는)"
    ],
    // 💎 [FIXED] Tech Specs - 고화질 기본값
    "rep": ["Hyper-realistic Photo (극사실 사진)", "Unreal Engine 5", "Architectural Photography", "Cinematic Still"],
    "engine": ["Unreal Engine 5.5", "V-Ray 6", "Midjourney V6.1", "Octane Render"],
    "view": ["Eye-level (눈높이)", "Low Angle", "Aerial View", "Drone Shot", "Isometric"],
    "lens": ["35mm Lens (표준 광각)", "24mm Wide", "50mm Prime", "85mm Portrait", "Tilt-Shift"],
    "motion": ["Still Life (정적인)", "Long Exposure", "Motion Blur", "Time-lapse"],
    "light": ["Natural Sunlight", "Soft Diffused", "Neon Lights", "Cinematic Lighting", "Volumetric Fog", "God Rays"],
    "ratio": ["--ar 1:1 (Square)", "--ar 16:9", "--ar 4:3", "--ar 9:16"]
};

// 💎 모든 프리셋에 공통으로 적용될 Tech Specs (요청하신 사진 기준)
const COMMON_TECH_SPECS = {
    s14: "Hyper-realistic Photo (극사실 사진)",
    s15: "Unreal Engine 5.5",
    s16: "Eye-level (눈높이)",
    s22: "35mm Lens (표준 광각)",
    s26: "Still Life (정적인)",
    s18: "--ar 1:1 (Square)"
};

// ==========================================================================
// 2. THEME PRESETS (15 Themes x 5 Variations = 75 Presets)
// ==========================================================================
const THEME_PRESETS = {
    // 🏛️ HERITAGE (과거 / 전통)
    'heritage': [
        { ...COMMON_TECH_SPECS, s5: "Traditional Hanok (전통 한옥)", s0: "South Korea (대한민국)", s1: "Seoul Bukchon (서울 북촌)", s6: "Korean Giwa (기와)", s2: "Narrow Golmok Alley (좁은 골목길)", s19: "Madang Courtyard (마당)", s8: "Courtyard House (중정형 주택)", s9: "Late Afternoon (늦은 오후)", s3: "1.단독주택", s4: "Detached House", boost: "authentic cultural heritage, national geographic photography, highly detailed texture" },
        { ...COMMON_TECH_SPECS, s5: "Gothic Revival (고딕 리바이벌)", s0: "Europe (유럽)", s1: "London Victorian District (런던)", s6: "Limestone (라임스톤)", s8: "Spire Top (첨탑)", s9: "Overcast (잔뜩 흐림)", s3: "6.종교시설", s4: "Cathedral", boost: "monumental scale, cinematic history, dramatic lighting, sharp focus" },
        { ...COMMON_TECH_SPECS, s5: "Traditional Japanese (전통 일본식)", s0: "Asia / Middle East (아시아/중동)", s1: "Kyoto Zen Garden (교토)", s6: "Charred Wood (탄화목)", s19: "Zen Rock Garden (젠 정원)", s9: "Dawn Mist (새벽 안개)", s3: "15.숙박시설", s4: "Hanok Hotel", boost: "zen philosophy, wabi-sabi, peaceful morning, serene atmosphere" },
        { ...COMMON_TECH_SPECS, s5: "Islamic Architecture (이슬람 양식)", s0: "Asia / Middle East (아시아/중동)", s1: "Istanbul Bosphorus (이스탄불)", s6: "Mosaic Tile (모자이크 타일)", s8: "Dome Structure (돔)", s9: "Sunset (일몰)", s3: "6.종교시설", s4: "Cathedral", boost: "intricate geometric patterns, majestic dome, arabesque details" },
        { ...COMMON_TECH_SPECS, s5: "Neoclassical (신고전주의)", s0: "Europe (유럽)", s1: "Rome Colosseum Area (로마)", s6: "Marble (대리석)", s8: "Colonnade Walkway (열주 회랑)", s9: "High Noon (정오)", s3: "5.문화및집회시설", s4: "Museum", boost: "monumental pillars, timeless elegance, symmetrical composition" }
    ],

    // 🏙️ MODERN (현재 / 모던)
    'modern': [
        { ...COMMON_TECH_SPECS, s5: "Minimalist (미니멀리즘)", s0: "South Korea (대한민국)", s1: "Seoul Gangnam (서울 강남)", s6: "Exposed Concrete (노출 콘크리트)", s8: "Cubic Box (정육면체)", s9: "High Noon (정오)", s3: "2.공동주택", s4: "Row House", boost: "archdaily featured, clean lines, tadao ando style, pure geometry" },
        { ...COMMON_TECH_SPECS, s5: "Mid-Century Modern (미드센추리 모던)", s0: "USA / Americas (미주)", s1: "Los Angeles Beverly Hills (LA)", s6: "White Stucco (스타코)", s19: "Infinity Pool (인피니티 풀)", s8: "Cantilevered (캔틸레버)", s9: "Sunset (일몰)", s3: "1.단독주택", s4: "Detached House", boost: "luxury lifestyle, david hockney style, iconic design, clear sky" },
        { ...COMMON_TECH_SPECS, s5: "Brutalist (브루탈리즘)", s0: "Europe (유럽)", s1: "Berlin Mitte (베를린)", s6: "Exposed Concrete (노출 콘크리트)", s8: "Monolithic Block (일체형 블록)", s9: "Overcast (잔뜩 흐림)", s3: "10.교육연구시설", s4: "University Campus", boost: "raw materiality, massive scale, bold geometry, le corbusier inspiration" },
        { ...COMMON_TECH_SPECS, s5: "Bauhaus (바우하우스)", s0: "Europe (유럽)", s1: "Berlin Mitte (베를린)", s6: "Curtain Wall Glass (커튼월)", s8: "Grid Structure (격자 구조)", s3: "17.공장", s4: "Manufacturing Plant", boost: "functionalism, primary colors accent, industrial heritage, walter gropius" },
        { ...COMMON_TECH_SPECS, s5: "Industrial Chic (인더스트리얼 시크)", s0: "South Korea (대한민국)", s1: "Seoul Seongsu (서울 성수)", s6: "Red Brick (붉은 벽돌)", s8: "Stacked Boxes (쌓인 박스)", s9: "Evening Glow (저녁 노을)", s3: "4.제2종근린생활시설", s4: "General Office", boost: "renovated warehouse, urban loft style, trendy atmosphere, exposed steel beams" }
    ],

    // 🌿 ORGANIC (친환경 / 자연)
    'organic': [
        { ...COMMON_TECH_SPECS, s5: "Biophilic (바이오필릭)", s0: "Asia / Middle East (아시아/중동)", s1: "Singapore Gardens by the Bay (싱가포르)", s6: "Green Wall (수직 정원)", s8: "Fluid Organic (유기적 곡선)", s9: "Morning Haze (아침 안개)", s3: "14.업무시설", s4: "Office Skyscraper", boost: "sustainable architecture, eco-friendly, lush vegetation, harmony with nature" },
        { ...COMMON_TECH_SPECS, s5: "Organic Architecture (유기적 건축)", s0: "USA / Americas (미주)", s1: "Grand Canyon Edge (그랜드 캐년)", s6: "Sandstone (샌드스톤)", s8: "Fluid Organic (유기적 곡선)", s9: "Golden Hour (골든아워)", s3: "15.숙박시설", s4: "Resort Condominium", boost: "frank lloyd wright inspiration, blended with landscape, fallingwater style" },
        { ...COMMON_TECH_SPECS, s5: "Bamboo Architecture (대나무 건축)", s0: "Asia / Middle East (아시아/중동)", s1: "Bali Ubud Jungle (발리)", s6: "Bamboo (대나무)", s19: "Jungle (정글)", s8: "Fluid Organic (유기적 곡선)", s9: "Rainy (비오는)", s3: "15.숙박시설", s4: "Boutique Hotel", boost: "sustainable craft, tropical paradise, intricate bamboo structure" },
        { ...COMMON_TECH_SPECS, s5: "Earthship (어스십)", s0: "Nature / Wild (대자연)", s1: "Sahara Desert Oasis (사하라)", s6: "Rammed Earth (다짐 흙)", s8: "Single-story (단층)", s9: "High Noon (정오)", s3: "1.단독주택", s4: "Detached House", boost: "off-grid living, thermal mass architecture, eco-conscious, unique desert form" },
        { ...COMMON_TECH_SPECS, s5: "Vertical Farm (수직 농장)", s0: "South Korea (대한민국)", s1: "Seoul Mapo-gu (서울 마포)", s6: "Glass and Steel (유리와 철강)", s19: "Vertical Garden (수직 정원)", s8: "Stacked Slabs (쌓인 슬래브)", s9: "Midday Sun (한낮)", s3: "21.동물및식물관련시설", s4: "Vertical Farm", boost: "urban agriculture, smart city, sustainable food source, glasshouse aesthetic" }
    ],

    // 🚀 HI-TECH (미래 / 기술)
    'hitech': [
        { ...COMMON_TECH_SPECS, s5: "Neo-Futurism (네오 퓨처리즘)", s0: "South Korea (대한민국)", s1: "Seoul Dongdaemun DDP Area (서울 동대문)", s6: "Titanium Panel (티타늄 패널)", s8: "Fluid Organic (유기적 곡선)", s9: "Blue Hour (블루아워)", s3: "5.문화및집회시설", s4: "Art Gallery", boost: "zaha hadid style, parametric design, futuristic curves, metallic texture" },
        { ...COMMON_TECH_SPECS, s5: "High-Tech (하이테크)", s0: "Europe (유럽)", s1: "Parisian Street (파리)", s6: "Steel and Glass (강철과 유리)", s8: "Exoskeleton (외골격 구조)", s9: "Night (밤)", s3: "5.문화및집회시설", s4: "Museum", boost: "exposed structure, pompidou center inspiration, machinery aesthetic" },
        { ...COMMON_TECH_SPECS, s5: "Smart City Hub (스마트 시티 허브)", s0: "South Korea (대한민국)", s1: "Pangyo Techno Valley (판교)", s6: "Smart Glass (스마트 글라스)", s8: "Modular Stack (모듈러 스택)", s9: "High Noon (정오)", s3: "14.업무시설", s4: "Company Headquarters", boost: "clean tech-campus, automated facade, minimalist future, high-efficiency" },
        { ...COMMON_TECH_SPECS, s5: "Parametric Mesh (파라메트릭 메쉬)", s0: "Asia / Middle East (아시아/중동)", s1: "Dubai Marina (두바이)", s6: "Aluminum (알루미늄)", s8: "Twisted Spiral (나선형)", s9: "Golden Hour (골든아워)", s3: "14.업무시설", s4: "Office Skyscraper", boost: "complex geometry, computational design, luxury skyscraper, shimmering surface" },
        { ...COMMON_TECH_SPECS, s5: "Kinetic Facade (가변 파사드)", s0: "USA / Americas (미주)", s1: "Modern Manhattan (맨해튼)", s6: "Titanium Panel (티타늄 패널)", s8: "Skyscraper (마천루)", s9: "Sunset (일몰)", s3: "14.업무시설", s4: "Office Skyscraper", boost: "moving parts, adaptive facade, high-tech movement, architectural innovation" }
    ],

    // 🛸 SCI-FI (우주 / 초미래)
    'scifi': [
        { ...COMMON_TECH_SPECS, s5: "Solarpunk (솔라펑크)", s0: "Asia / Middle East (아시아/중동)", s1: "Singapore Gardens by the Bay (싱가포르)", s6: "Photovoltaic Glass (태양광 유리)", s19: "Vertical Garden (수직 정원)", s8: "Fluid Organic (유기적 곡선)", s9: "Sunny with Clouds (구름 낀 맑음)", s3: "14.업무시설", s4: "Office Skyscraper", boost: "utopian future, lush greenery integrated with technology, clean energy" },
        { ...COMMON_TECH_SPECS, s5: "Space Age (스페이스 에이지)", s0: "Sci-Fi / Space (우주)", s1: "Moon Surface Base (달 기지)", s6: "Titanium Panel (티타늄 패널)", s8: "Geodesic Dome (지오데식 돔)", s9: "Starry Night (별밤)", s3: "10.교육연구시설", s4: "Research Center", boost: "lunar colony, harsh shadows, crater landscape, futuristic pods, realistic sci-fi" },
        { ...COMMON_TECH_SPECS, s5: "Cloud City (공중 도시)", s0: "Sci-Fi / Space (우주)", s1: "Cloud City (공중 도시)", s6: "White Stucco (화이트 스타코)", s8: "Fluid Organic (유기적 곡선)", s9: "Clear Sky (맑음)", s3: "1.단독주택", s4: "Detached House", boost: "utopian future, clean composition, ethereal atmosphere, floating in clouds" },
        { ...COMMON_TECH_SPECS, s5: "Mars Colony Hub (화성 기지)", s0: "Sci-Fi / Space (우주)", s1: "Mars Colony (화성)", s6: "Fiberglass (유리섬유)", s8: "Nested Volumes (중첩 볼륨)", s9: "Dust Storm (모래폭풍)", s3: "10.교육연구시설", s4: "Research Center", boost: "interstellar movie style, red dust, futuristic survival, nasa punk" },
        { ...COMMON_TECH_SPECS, s5: "Cybernetic Hub (사이버네틱 허브)", s0: "Sci-Fi / Space (우주)", s1: "Underwater City (수중 도시)", s6: "Dichroic Glass (다이크로익 유리)", s8: "Spherical (구형)", s9: "Deep Night (심야)", s3: "14.업무시설", s4: "Company Headquarters", boost: "high-tech underground, glowing wires, sub-aquatic future, advanced biology" }
    ],

    // 🌙 NIGHT (야경 / 네온)
    'night': [
        { ...COMMON_TECH_SPECS, s5: "Cyberpunk (사이버펑크)", s0: "Asia / Middle East (아시아/중동)", s1: "Hong Kong Neon Street (홍콩)", s6: "Curtain Wall Glass (커튼월)", s9: "Deep Night (심야)", s17: "Neon Lights (네온)", s3: "16.위락시설", s4: "Nightclub", boost: "neon signage, rain reflection, blade runner style, crowded alley" },
        { ...COMMON_TECH_SPECS, s5: "Noir Atmosphere (느와르 분위기)", s0: "USA / Americas (미주)", s1: "New York Brooklyn (뉴욕)", s6: "Red Brick (붉은 벽돌)", s9: "Midnight (자정)", s17: "Dramatic Lighting (드라마틱 조명)", s3: "14.업무시설", s4: "General Office", boost: "dramatic shadows, misty street lamp, cinematic noir film style" },
        { ...COMMON_TECH_SPECS, s5: "Neon Favela (네온 빈민가)", s0: "USA / Americas (미주)", s1: "Rio Copacabana (리오)", s6: "Corrugated Metal (골함석)", s9: "Night (밤)", s17: "Neon Lights (네온)", s3: "2.공동주택", s4: "Apartment Complex", boost: "glowing wires, dense urban fabric, vibrant neon colors, gritty" },
        { ...COMMON_TECH_SPECS, s5: "Luxury Skybar (럭셔리 스카이바)", s0: "South Korea (대한민국)", s1: "Seoul Yeouido (서울 여의도)", s6: "Polished Steel (폴리싱 스틸)", s9: "Blue Hour (블루아워)", s17: "City Lights (도시 조명)", s3: "4.제2종근린생활시설", s4: "General Restaurant", boost: "infinity view, high-end interior, evening city lights, elegant" },
        { ...COMMON_TECH_SPECS, s5: "Vegas Neon (베가스 네온)", s0: "USA / Americas (미주)", s1: "Miami Art Deco District (마이애미)", s6: "White Stucco (화이트 스타코)", s9: "Night (밤)", s17: "Neon Lights (네온)", s3: "15.숙박시설", s4: "Luxury Hotel", boost: "retro neon lights, art deco facade, palm trees at night, festive" }
    ],

    // 🌲 FOREST (숲 / 안개)
    'forest': [
        { ...COMMON_TECH_SPECS, s5: "Rustic Cabin (러스틱 캐빈)", s0: "Nature / Wild (대자연)", s1: "Rocky Mountains (록키 산맥)", s6: "Weathered Barn Wood (고재)", s19: "Pine Trees (소나무)", s9: "Morning Mist (아침 안개)", s3: "1.단독주택", s4: "Detached House", boost: "cozy fireplace, secluded forest, natural wood texture, birds view" },
        { ...COMMON_TECH_SPECS, s5: "Modern Forest House (모던 숲 하우스)", s0: "Europe (유럽)", s1: "Scandinavian Fjord (북유럽)", s6: "Steel and Glass (강철과 유리)", s19: "Forest (숲)", s9: "Sunrise (일출)", s3: "1.단독주택", s4: "Detached House", boost: "minimalist glass box, forest reflection, dawn sunlight, peaceful" },
        { ...COMMON_TECH_SPECS, s5: "Jungle Temple (정글 템플)", s0: "Asia / Middle East (아시아/중동)", s1: "Vietnam Ha Long Bay (베트남)", s6: "Sandstone (샌드스톤)", s19: "Jungle (정글)", s9: "Humid (습한)", s3: "6.종교시설", s4: "Buddhist Temple", boost: "ancient overgrown ruins, deep jungle, misty atmosphere, mysterious" },
        { ...COMMON_TECH_SPECS, s5: "Redwood Lodge (레드우드 로지)", s0: "USA / Americas (미주)", s1: "Vancouver Seawall (밴쿠버)", s6: "CLT Timber (목재)", s19: "Pine Trees (소나무)", s9: "Late Afternoon (늦은 오후)", s3: "15.숙박시설", s4: "Resort Condominium", boost: "massive tree trunks, high ceiling, warm interior, alpine forest" },
        { ...COMMON_TECH_SPECS, s5: "Birch Pavilion (자작나무 파빌리온)", s0: "Europe (유럽)", s1: "Norwegian Village (노르웨이)", s6: "Light Wood (밝은 목재)", s19: "Birch Forest (자작나무 숲)", s9: "Morning Haze (아침 안개)", s3: "5.문화및집회시설", s4: "Art Gallery", boost: "white birch trees, soft morning light, ethereal and calm, vertical lines" }
    ],

    // 🏜️ DESERT (사막 / 듄)
    'desert': [
        { ...COMMON_TECH_SPECS, s5: "Desert Dune Villa (사막 듄 빌라)", s0: "Nature / Wild (대자연)", s1: "Sahara Desert Oasis (사하라)", s6: "Rammed Earth (다짐 흙)", s19: "Desert Flora (사막 식물)", s9: "Sunset (일몰)", s3: "1.단독주택", s4: "Detached House", boost: "dune movie aesthetic, sand particles, warm orange glow, vast dunes" },
        { ...COMMON_TECH_SPECS, s5: "Sandstone Fortress (사막 요새)", s0: "Asia / Middle East (아시아/중동)", s1: "Petra Ancient City (페트라)", s6: "Sandstone (샌드스톤)", s9: "High Noon (정오)", s3: "15.숙박시설", s4: "Luxury Hotel", boost: "carved into rock, historical mystery, harsh sunlight, desert wind" },
        { ...COMMON_TECH_SPECS, s5: "Mirrored Box (거울 박스)", s0: "Nature / Wild (대자연)", s1: "Grand Canyon Edge (그랜드 캐년)", s6: "Curtain Wall Glass (커튼월)", s9: "Golden Hour (골든아워)", s3: "3.제1종근린생활시설", s4: "Cafe/Tea House", boost: "invisible architecture, reflecting desert, spectacular view, minimal" },
        { ...COMMON_TECH_SPECS, s5: "Adobe Village (어도비 마을)", s0: "USA / Americas (미주)", s1: "Mexico City Zocalo (멕시코)", s6: "Adobe Mud (흙벽)", s9: "Midday Sun (한낮)", s3: "2.공동주택", s4: "Row House", boost: "traditional craft, rounded edges, vibrant desert life, terracotta tones" },
        { ...COMMON_TECH_SPECS, s5: "Solar Array Hub (태양광 허브)", s0: "Nature / Wild (대자연)", s1: "Grand Canyon Edge (그랜드 캐년)", s6: "Photovoltaic Glass (태양광 유리)", s9: "High Noon (정오)", s3: "25.발전시설", s4: "Solar Power Plant", boost: "futuristic energy, vast mirrors, high-tech desert, sci-fi landscape" }
    ],

    // ❄️ SNOW (설경 / 겨울)
    'snow': [
        { ...COMMON_TECH_SPECS, s5: "Ice Hotel (아이스 호텔)", s0: "Europe (유럽)", s1: "Reykjavik Ice Field (레이캬비크)", s6: "Frosted Glass (반투명 유리)", s9: "Blue Hour (블루아워)", s3: "15.숙박시설", s4: "Luxury Hotel", boost: "glowing blue ice, crystal structures, arctic night, ethereal" },
        { ...COMMON_TECH_SPECS, s5: "Alpine Chalet (알프스 샬레)", s0: "Europe (유럽)", s1: "Swiss Alpine (알프스)", s6: "Charred Wood (탄화목)", s9: "Snowy (눈 내리는)", s3: "15.숙박시설", s4: "Resort Condominium", boost: "warm lights inside, heavy snow on roof, cozy winter vibe" },
        { ...COMMON_TECH_SPECS, s5: "Arctic Research (북극 연구소)", s0: "Nature / Wild (대자연)", s1: "Antarctica Research Station (남극 기지)", s6: "Titanium Panel (티타늄 패널)", s9: "Polar Night (극야)", s3: "10.교육연구시설", s4: "Research Center", boost: "high-tech isolation, glowing windows, aurora borealis, icy ground" },
        { ...COMMON_TECH_SPECS, s5: "Modern Glass Igloo (모던 유리 이글루)", s0: "Europe (유럽)", s1: "Scandinavian Fjord (북유럽)", s6: "Glass Block (유리 블록)", s9: "Starlight (별빛)", s3: "1.단독주택", s4: "Detached House", boost: "seeing stars from bed, futuristic igloo, cold exterior vs warm interior" },
        { ...COMMON_TECH_SPECS, s5: "Snowy Temple (눈 덮인 사찰)", s0: "South Korea (대한민국)", s1: "Gyeongju Bulguksa Temple (경주)", s6: "Korean Giwa (기와)", s9: "Morning Mist (아침 안개)", s3: "6.종교시설", s4: "Buddhist Temple", boost: "white snow on black tiles, traditional quietness, meditative" }
    ],

    // 🌊 OCEAN (바다 / 휴양)
    'ocean': [
        { ...COMMON_TECH_SPECS, s5: "Overwater Villa (수상 빌라)", s0: "Nature / Wild (대자연)", s1: "Maldives Overwater (몰디브)", s6: "Thatch Roof (초가지붕)", s9: "Midday Sun (한낮)", s3: "15.숙박시설", s4: "Resort Condominium", boost: "turquoise water, floating life, vacation paradise, bright and airy" },
        { ...COMMON_TECH_SPECS, s5: "Coastal Cliff House (해안 절벽 집)", s0: "Europe (유럽)", s1: "Santorini White (산토리니)", s6: "White Stucco (화이트 스타코)", s9: "Sunset (일몰)", s3: "1.단독주택", s4: "Detached House", boost: "edge of the world, deep blue sea, Aegean breeze, luxury living" },
        { ...COMMON_TECH_SPECS, s5: "Modern Lighthouse (모던 등대)", s0: "South Korea (대한민국)", s1: "Jeju Volcanic Coast (제주 해안)", s6: "Exposed Concrete (노출 콘크리트)", s9: "Stormy (폭풍우)", s3: "27.관광휴게시설", s4: "Observatory Tower", boost: "dramatic waves, crashing water, strong architecture, lighthouse beam" },
        { ...COMMON_TECH_SPECS, s5: "Salt Flat Pavilion (소금 사막 파빌리온)", s0: "Nature / Wild (대자연)", s1: "Bolivia Salt Flat (볼리비아)", s6: "Mirrored Glass (거울 유리)", s9: "Blue Hour (블루아워)", s3: "5.문화및집회시설", s4: "Art Gallery", boost: "perfect reflection, horizon merging, surreal sky, white salt ground" },
        { ...COMMON_TECH_SPECS, s5: "Industrial Port Hub (산업 항구 허브)", s0: "South Korea (대한민국)", s1: "Busan Marine City (부산)", s6: "Steel and Glass (강철과 유리)", s9: "Night (밤)", s3: "8.운수시설", s4: "Airport Terminal", boost: "busan port view, glowing bridge, harbor lights, high-density city" }
    ],

    // 🍹 RESORT (럭셔리 / 호텔)
    'resort': [
        { ...COMMON_TECH_SPECS, s5: "Luxury Infinity Resort (럭셔리 인피니티 리조트)", s0: "Asia / Middle East (아시아/중동)", s1: "Bali Ubud Jungle (발리)", s6: "Bamboo (대나무)", s19: "Infinity Pool (인피니티 풀)", s9: "Sunset (일몰)", s3: "15.숙박시설", s4: "Luxury Hotel", boost: "infinity pool, jungle canopy, tropical luxury, warm sunset glow" },
        { ...COMMON_TECH_SPECS, s5: "Mediterranean Spa (지중해 스파)", s0: "Europe (유럽)", s1: "Barcelona Eixample (바르셀로나)", s6: "Marble (대리석)", s9: "Sunny with Clouds (구름 낀 맑음)", s3: "15.숙박시설", s4: "Boutique Hotel", boost: "wellness retreat, white columns, peaceful courtyard, soft shadows" },
        { ...COMMON_TECH_SPECS, s5: "Safari Lodge (사파리 로지)", s0: "Nature / Wild (대자연)", s1: "Cape Town Table Mountain (케이프타운)", s6: "Rammed Earth (다짐 흙)", s9: "Golden Hour (골든아워)", s3: "15.숙박시설", s4: "Luxury Hotel", boost: "wildlife view, sunset savanna, high-end tent design, earthy textures" },
        { ...COMMON_TECH_SPECS, s5: "Ski Resort (스키 리조트)", s0: "Europe (유럽)", s1: "Pyeongchang Alpensia (평창)", s6: "Light Wood (밝은 목재)", s9: "Evening Glow (저녁 노을)", s3: "15.숙박시설", s4: "Resort Condominium", boost: "ski-in ski-out, snowy mountains, vibrant night skiing lights" },
        { ...COMMON_TECH_SPECS, s5: "Wellness Retreat (웰니스 리트리트)", s0: "South Korea (대한민국)", s1: "Jeju Bijarim Forest (제주 비자림)", s6: "Basalt (현무암)", s19: "Forest (숲)", s9: "Morning Mist (아침 안개)", s3: "15.숙박시설", s4: "Boutique Hotel", boost: "healing forest, volcanic stone, quiet morning, misty meditation" }
    ],

    // 👾 CYBERPUNK (사이버펑크)
    'cyber': [
        { ...COMMON_TECH_SPECS, s5: "Neon Market (네온 마켓)", s0: "Asia / Middle East (아시아/중동)", s1: "Osaka Dotonbori (오사카)", s6: "Holographic Projection (홀로그램)", s9: "Deep Night (심야)", s3: "7.판매시설", s4: "Traditional Market", boost: "chaotic neon signs, street food smoke, holographic ads, wet floor" },
        { ...COMMON_TECH_SPECS, s5: "Megastructure (메가스트럭처)", s0: "Asia / Middle East (아시아/중동)", s1: "Kuala Lumpur Petronas (쿠알라룸푸르)", s6: "Titanium Panel (티타늄 패널)", s9: "Blue Hour (블루아워)", s3: "14.업무시설", s4: "Office Skyscraper", boost: "towering scale, skybridges, glowing city grid, sci-fi skyline" },
        { ...COMMON_TECH_SPECS, s5: "Data-Hub Alley (데이터 허브 골목)", s0: "South Korea (대한민국)", s1: "Seoul Euljiro (서울 을지로)", s6: "Corrugated Metal (골함석)", s9: "Night (밤)", s3: "24.방송통신시설", s4: "Data Center", boost: "gritty tech, retro-future, narrow alley, glowing server lights" },
        { ...COMMON_TECH_SPECS, s5: "Hacker Den (해커 소굴)", s0: "Asia / Middle East (아시아/중동)", s1: "Mumbai Slum Contrast (뭄바이)", s6: "Recycled Plastic (플라스틱)", s9: "Midnight (자정)", s3: "2.공동주택", s4: "Dormitory", boost: "low life high tech, messy wires, multi-layered city, gritty texture" },
        { ...COMMON_TECH_SPECS, s5: "Sky-Port (스카이 포트)", s0: "Sci-Fi / Space (우주)", s1: "Cloud City (공중 도시)", s6: "Polished Steel (폴리싱 스틸)", s9: "Dawn (새벽)", s3: "8.운수시설", s4: "Airport Terminal", boost: "flying car landing, morning sky, futuristic transit, high-fidelity" }
    ],

    // 🧱 RUINS (폐허 / 유적)
    'ruins': [
        { ...COMMON_TECH_SPECS, s5: "Overgrown Factory (뒤덮인 공장)", s0: "South Korea (대한민국)", s1: "Cheongju Tobacco Plant (청주)", s6: "Red Brick (붉은 벽돌)", s19: "Overgrown Jungle (정글)", s9: "Overcast (잔뜩 흐림)", s3: "17.공장", s4: "General Factory", boost: "the last of us style, nature taking over, rusted steel, mossy walls" },
        { ...COMMON_TECH_SPECS, s5: "Sunken Temple (침몰한 신전)", s0: "Asia / Middle East (아시아/중동)", s1: "Cambodia Angkor Wat (앙코르와트)", s6: "Sandstone (샌드스톤)", s19: "Jungle (정글)", s9: "Dawn Mist (새벽 안개)", s3: "6.종교시설", s4: "Buddhist Temple", boost: "roots growing through stone, ancient mystery, jungle mist, cinematic" },
        { ...COMMON_TECH_SPECS, s5: "Deserted Mall (버려진 쇼핑몰)", s0: "USA / Americas (미주)", s1: "Detroit Urban Decay (디트로이트)", s6: "Broken Glass (깨진 유리)", s9: "Gloomy (우울함)", s3: "7.판매시설", s4: "Shopping Mall", boost: "eerie quiet, broken escalator, rays of light through roof, nostalgia" },
        { ...COMMON_TECH_SPECS, s5: "Post-Apocalyptic City (포스트 아포칼립스)", s0: "Europe (유럽)", s1: "Chernobyl Exclusion Zone (체르노빌)", s6: "Exposed Concrete (노출 콘크리트)", s9: "After the Rain (비 온 뒤)", s3: "2.공동주택", s4: "Apartment Complex", boost: "abandoned life, empty playground, cold atmosphere, realistic decay" },
        { ...COMMON_TECH_SPECS, s5: "Ancient Colosseum (고대 콜로세움)", s0: "Europe (유럽)", s1: "Rome Colosseum Area (로마)", s6: "Travertine (트래버틴)", s9: "Moonlight (달빛)", s3: "5.문화및집회시설", s4: "Art Gallery", boost: "historical ruins under stars, cinematic night, dramatic heritage" }
    ],

    // 🌌 SPACE (우주 식민지)
    'space': [
        { ...COMMON_TECH_SPECS, s5: "Mars Colony Hub (화성 기지)", s0: "Sci-Fi / Space (우주)", s1: "Mars Colony (화성)", s6: "Titanium Panel (티타늄 패널)", s9: "High Noon (정오)", s3: "10.교육연구시설", s4: "Research Center", boost: "red dust, futuristic domes, harsh terrain, interplanetary life" },
        { ...COMMON_TECH_SPECS, s5: "Asteroid Mining Base (소행성 기지)", s0: "Sci-Fi / Space (우주)", s1: "Space Station Module (우주 기지)", s6: "Carbon Fiber (카본 파이버)", s9: "Starlight (별빛)", s3: "17.공장", s4: "Manufacturing Plant", boost: "industrial space, massive machinery, dark vacuum of space, metallic" },
        { ...COMMON_TECH_SPECS, s5: "Lunar Resort (달 리조트)", s0: "Sci-Fi / Space (우주)", s1: "Moon Surface Base (달 기지)", s6: "White Stucco (화이트 스타코)", s9: "Earth-Rise (지구 뜨기)", s3: "15.숙박시설", s4: "Luxury Hotel", boost: "clean white pods, looking back at earth, soft interior glow, futuristic" },
        { ...COMMON_TECH_SPECS, s5: "Interstellar Library (인터스텔라 도서관)", s0: "Sci-Fi / Space (우주)", s1: "Cloud City (공중 도시)", s6: "Dichroic Glass (다이크로익 유리)", s9: "Starry Night (별밤)", s3: "10.교육연구시설", s4: "Large Library", boost: "infinite books, floating archives, nebular view through glass" },
        { ...COMMON_TECH_SPECS, s5: "Titan Base (타이탄 기지)", s0: "Sci-Fi / Space (우주)", s1: "Mars Colony (화성)", s6: "Smart Glass (스마트 글라스)", s9: "Foggy Season (안개 시즌)", s3: "23.교정및군사시설", s4: "Military Bunker", boost: "thick methane atmosphere, glowing orange light, heavy duty architecture" }
    ],

    // 🐠 UNDERWATER (수중 도시)
    'underwater': [
        { ...COMMON_TECH_SPECS, s5: "Coral Hub (산호 허브)", s0: "Nature / Wild (대자연)", s1: "Underwater City (수중 도시)", s6: "Thick Glass (두꺼운 유리)", s19: "Coral Reef (산호초)", s9: "Deep Night (심야)", s3: "5.문화및집회시설", s4: "Museum", boost: "bioluminescent sea life, coral gardens, caustic light effects, deep blue" },
        { ...COMMON_TECH_SPECS, s5: "Deep-Sea Lab (심해 실험실)", s0: "Nature / Wild (대자연)", s1: "Underwater City (수중 도시)", s6: "Titanium Panel (티타늄 패널)", s9: "Midnight (자정)", s3: "10.교육연구시설", s4: "Research Center", boost: "high pressure design, glowing submarine windows, floating bubbles" },
        { ...COMMON_TECH_SPECS, s5: "Sub-Villa (수중 빌라)", s0: "Nature / Wild (대자연)", s1: "Maldives Overwater (몰디브)", s6: "Smart Glass (스마트 글라스)", s9: "Night (밤)", s3: "1.단독주택", s4: "Detached House", boost: "bedroom under the sea, shark swimming by, peaceful underwater world" },
        { ...COMMON_TECH_SPECS, s5: "Ocean Floor Mall (해저 쇼핑몰)", s0: "Nature / Wild (대자연)", s1: "Underwater City (수중 도시)", s6: "Steel and Glass (강철과 유리)", s9: "Midday Sun (한낮)", s3: "7.판매시설", s4: "Shopping Mall", boost: "rays of sunlight through water, aquatic plants, grand underwater dome" },
        { ...COMMON_TECH_SPECS, s5: "Bioluminescent Dome (발광 돔)", s0: "Nature / Wild (대자연)", s1: "Underwater City (수중 도시)", s6: "Fiberglass (유리섬유)", s9: "Deep Night (심야)", s3: "16.위락시설", s4: "Amusement Park", boost: "avatar sea style, glowing flora, magical underwater vibe, high-fidelity" }
    ]
};

// API Endpoints
app.get('/api/data', (req, res) => {
    res.json({ dataSheet: DATA_SHEET });
});

app.get('/api/preset/:themeKey', (req, res) => {
    const key = req.params.themeKey;
    const presets = THEME_PRESETS[key];
    if (presets && presets.length > 0) {
        const choice = presets[Math.floor(Math.random() * presets.length)];
        res.json(choice);
    } else {
        res.json({ error: "No preset found" });
    }
});

// ==========================================================================
// 3. SECURE API CONFIGURATION (보안 API 설정)
// ==========================================================================

const { createClient } = require('@supabase/supabase-js');

// 🔐 [SECURITY] Use Service Role Key in Render Environment Variables
// [보안] Render 환경 변수에 SUPABASE_SERVICE_ROLE_KEY를 반드시 등록하세요.
const sbAdmin = createClient(
    process.env.SUPABASE_URL || 'https://oitqyfqzocjmubqmvzfw.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY // 마스터 비밀 키 (Master Secret Key)
);

// ==========================================================================
// 4. INTEGRATED GENERATION API (통합된 보안 생성 API)
// ==========================================================================

app.post('/api/generate', async (req, res) => {
    const { choices, themeBoost, userId } = req.body;

    // 1. User Authentication Check (유저 인증 확인)
    if (!userId) {
        return res.status(401).json({ error: "Login required. (로그인이 필요합니다.)" });
    }

    try {
        // 2. Server-side Credit Verification (서버에서 직접 크레딧 조회)
        const { data: userData, error: userError } = await sbAdmin.auth.admin.getUserById(userId);
        if (userError || !userData) {
            return res.status(404).json({ error: "User not found. (사용자를 찾을 수 없습니다.)" });
        }
        
        // 유저 메타데이터에서 크레딧 추출 (Extract credits from user metadata)
        let credits = userData.user.user_metadata?.credits || 0;

        // 3. Balance Check (잔액 확인)
        if (credits <= 0) {
            return res.status(403).json({ error: "No credits left. (크레딧이 부족합니다.)" });
        }

        // 4. Prompt Refinement Logic (프롬프트 데이터 정제)
        // 괄호 안의 한글 설명을 제거하고 영어 키워드만 남깁니다. (Remove Korean text in brackets)
        const getV = (k) => choices[k] ? choices[k].replace(/\([^)]*\)/g, "").replace(/\s+/g, " ").trim() : "";

        // 키워드 조합 (Keyword Assembly)
        const subject = [getV('s24'), getV('s5'), getV('s3'), getV('s4'), getV('s8'), getV('s7')].filter(Boolean).join(" ");
        const mat = [getV('s6'), getV('s23')].filter(Boolean).join(" and ");
        const env = [getV('s0'), getV('s1'), getV('s2'), getV('s19'), getV('s27'), getV('s20')].filter(Boolean).join(", situated in ");
        const atmo = [getV('s9'), getV('s10'), getV('s21'), getV('s17'), getV('s11')].filter(Boolean).join(", ");
        const tech = [getV('s14'), getV('s15'), getV('s16'), getV('s22'), getV('s26')].filter(Boolean).join(", ");
        
        // 5. Professional Prompt Construction (전문가용 프롬프트 빌딩)
        let prompt = `**Professional architectural photography of a ${subject}**. `;
        if(mat) prompt += `Materiality: Crafted from ${mat}. `;
        if(env) prompt += `Context: Located in ${env}. `;
        if(atmo) prompt += `Atmosphere: ${atmo}. `;
        if(tech) prompt += `Tech Specs: ${tech}. `;
        if(themeBoost) prompt += `\n**Style Boost**: ${themeBoost}. `;
        
        // AI 파라미터 및 품질 태그 (AI Parameters & Quality Tags)
        prompt += `\n--v 6.1 --style raw --ar ${getV('s18').replace("--ar ", "") || "1:1"} --q 2 --stylize 250`;
        prompt += `\nArchdaily masterpiece, sharp focus, magazine quality, clean composition, natural lighting --no text logo signature blurry words`;

        // 6. Secure Credit Deduction (서버에서 안전하게 크레딧 1 차감)
        const { error: updateError } = await sbAdmin.auth.admin.updateUserById(userId, {
            user_metadata: { credits: credits - 1 }
        });

        if (updateError) throw updateError;

        // 7. Return Result & Remaining Balance (결과 및 남은 잔액 반환)
        res.json({ 
            result: prompt, 
            remainingCredits: credits - 1 
        });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ error: "Server error occurred. (서버 오류가 발생했습니다.)" });
    }
});

// ==========================================================================
// 5. SERVER START (서버 시작)
// ==========================================================================

app.listen(port, () => {
    console.log(`🚀 MY ARCHITECT PRO Server running on port ${port}`);
});
