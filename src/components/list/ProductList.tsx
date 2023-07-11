export interface ProductCardProps {
  id: string;
  image: string;
  productName: string;
  price: string;
  stock: any;
}

const ProductList: ProductCardProps[] = [
  {
    id: "1",
    image: "https://i.postimg.cc/DyBPr4Rd/2023-07-11-110359.png",
    productName: "[탄단지] 닭가슴살 현미 삼각주먹밥 500g 3종 (택1)",
    /*맛있고 간편한 식단관리*/
    price: "6,500",
    stock: "0",
  },
  {
    id: "2",
    image: "https://i.postimg.cc/KvD3BXk6/2023-07-11-111349.png",
    productName: "[Shotping's] 마시는 플레인 요거트 750mL",
    /*SACCO 유산균으로 완성한 요거트의 최선*/
    price: "7,480",
    stock: "1",
  },
  {
    id: "3",
    image: "https://i.postimg.cc/mgqdfFLN/2023-07-11-112702.png",
    productName: "[어니스트] 그릭요거트 플레인 오리지널 100g",
    /*오직 원유와 유산균만으로 정확하게*/
    price: "3,700",
    stock: "1",
  },
  {
    id: "4",
    image: "https://i.postimg.cc/Kj3GHkxW/2023-07-11-113951.png",
    productName: "[치즈] 프로바이오요거트 딸기 900mL",
    /*담백한 풍미 그대로 담은*/
    price: "7,400",
    stock: "1",
  },
  {
    id: "5",
    image: "https://i.postimg.cc/3R1n82kk/image.png",
    productName: "상품명",
    price: "0",
    stock: "1",
  },
  {
    id: "6",
    image: "https://i.postimg.cc/YCxLWzwR/2023-07-11-135202.png",
    productName: "[브레댄코] 흑임자 케이크",
    /*흑임자의 고소한 풍미 가득*/
    price: "29,900",
    stock: "1",
  },
  {
    id: "7",
    image: "https://i.postimg.cc/WpKNBnDf/2023-07-11-115338.png",
    productName: "조선향미 4kg",
    /*오감만족 쌀밥의 품격(22년산 쌀)*/
    price: "25,900",
    stock: "1",
  },
  {
    id: "8",
    image: "https://i.postimg.cc/3xRrDcD1/2023-07-11-113507.png",
    productName: "[목장] 플레인 요거트 500mL",
    /*국내산 원유의 진한 풍미가 돋보이는*/
    price: "12,000",
    stock: "1",
  },
  {
    id: "9",
    image: "https://i.postimg.cc/htjL0YPv/2023-07-11-132334.png",
    productName: "[닥터넛츠]국산 밤 양갱",
    price: "6,500",
    stock: "1",
  },
  {
    id: "10",
    image: "https://i.postimg.cc/3R1n82kk/image.png",
    productName: "상품명",
    price: "0",
    stock: "1",
  },
  {
    id: "11",
    image: "https://i.postimg.cc/qM8TJBZ0/2023-07-10-010527.png",
    productName: "[그릭데이] 그릭요거트 시그니처 450g",
    /*꾸덕한 요거트*/
    price: "12,150",
    /*13,500원 10% 할인*/
    stock: "1",
  },
  {
    id: "12",
    image: "https://i.postimg.cc/5t751TWC/2023-07-11-120156.png",
    productName: "[장어] 스틱 30포",
    /*전통 원료를 함유해 더욱 든든한*/
    price: "22,900",
    /*63,000원 63%할인*/
    stock: "1",
  },
  {
    id: "13",
    image: "https://i.postimg.cc/ZRzb9Kmt/2023-07-11-120433.png",
    productName: "[테일러] 애프터 딥워터 3종 (택1)",
    /*가볍고 상큼하게*/
    price: "17,500",
    /*19,400원 9%할인*/
    stock: "1",
  },
  {
    id: "14",
    image: "https://i.postimg.cc/3RcXVCS7/2023-07-11-134451.png",
    productName: "[서주] 딸기 생크림빵 (3개입)",
    /*딸기 과육의 상큼함이 살아있는*/
    price: "10,500",
    stock: "1",
  },
  {
    id: "15",
    image: "https://i.postimg.cc/G90psH2v/2023-07-11-133836.png",
    productName: "[군산 이성당] 1945카스테라 러브베어",
    /*달콤한 앙금을 품은 카스테라*/
    price: "14,000",
    stock: "1",
  },
  {
    id: "16",
    image: "https://i.postimg.cc/4ybkLQp3/2023-07-11-110840.png",
    productName: "[리틀넥] 스테이크 키트",
    price: "19,800",
    stock: "1",
  },
];

export default ProductList;
