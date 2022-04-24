class Review {
    constructor(posting_no, review_id, review_date, location, restaurant_name, review_score, restaurant_photo, restaurant_comment){
        this.posting_no = posting_no;
        this.review_id = review_id;
        this.review_date =review_date;
        this.location = location;
        this.restaurant_name = restaurant_name;
        this.review_score = review_score;
        this.restaurant_photo = restaurant_photo; // 사진경로 저장
        this.restaurant_comment = restaurant_comment;
    }
}

const reviewPostingAll = [];

//임의 데이터 추가 + 포스팅번호 관리
const addTempData = () => {
    let postingNo = 1;

    reviewPostingAll.push(new Review(postingNo++, "20220420_001", new Date("2021/12/25"), "인천광역시 관교동", "테리토리", 4.5, "./images/foodtrip/foodtrip_20220420_001.jpg",
    `음냐음냐 맛나당`));
    reviewPostingAll.push(new Review(postingNo++, "20220420_002", new Date("2022/02/26"), "인천광역시 중구", "을왕리짱구네", 4.3, "./images/foodtrip/foodtrip_20220420_002.jpg",
`매콤한 연포탕이라고 생각하면된다. 메뉴는 '빨간거', '하얀거' 이렇게 파는데 빨간게 맛있다.
직원분들이 알아서 조리해주고 낙지도 잘라주셔서 먹어도 된다고 할 때 까지 국자들 필요도 없어 편하다.
그리고 사리로 고기를 추가하면 두배로 맛있다. 지금까지 세 번 방문했는데 또 가고싶다.`));
};

const addOpenReviewListener = () => {
    const reviews = document.querySelectorAll("#postingBoardDiv li");
    // console.log(reviews);

    // 각 리뷰 클릭시 리뷰창 열리는 이벤트리스너 추가
    reviews.forEach((review, index) => {
        review.addEventListener("click", openReview);
        review.addEventListener("click", roadReviewDetail);
    });
    console.log(`openReview 이벤트리스너가 추가되었습니다.`);
};

const addcloseReviewListener = () => {
    const closeBtn = document.getElementById("closeReviewBtn");
    
    // 닫기버튼 클릭시 리뷰창 닫히는 이벤트리스너 추가
    closeBtn.addEventListener("click", closeReview);
    console.log(`closeReview 이벤트리스너가 추가되었습니다.`);
};

function openReview() {
    console.log(`${this.id}에서 openReview가 호출되었습니다.`);
    
    // 리뷰창 태그 찾기
    const backgroundPlate = document.getElementById("backgroundPlate");
    const reviewPlate = document.getElementById("reviewPlate");
    
    backgroundPlate.classList.add("reviewSection");
    backgroundPlate.classList.remove("visibilityHidden");
    
    reviewPlate.classList.add("review-wrapper-back");
    reviewPlate.classList.remove("visibilityHidden");
};

function closeReview() {
    console.log(`${this.id}에서 closeReview가 호출되었습니다.`);

    // 리뷰창 태그 찾기
    const backgroundPlate = document.getElementById("backgroundPlate");
    const reviewPlate = document.getElementById("reviewPlate");
    
    backgroundPlate.classList.add("visibilityHidden");
    backgroundPlate.classList.remove("reviewSection");
    
    reviewPlate.classList.add("visibilityHidden");
    reviewPlate.classList.remove("review-wrapper-back");
};

function roadReviewDetail(){
    console.log(`${this.id}의 정보를 불러옵니다!`);

    // 선택한 글에 해당하는 리뷰객체 탐색
    const review = reviewPostingAll.find((review, index) => {
        return this.id == review.review_id;
    });

    reviewDetailRender(review);
}

const postingBoardRender = () => {
    const target = document.querySelector("#postingBoardDiv ul")
    // console.log(target);

    const reverseReviewAll = [...reviewPostingAll].reverse();
    target.innerHTML = reverseReviewAll.reduce((html, review, index) => {
        return html + `<li class="posting" id="${review.review_id}"><img src="${review.restaurant_photo}" alt=""></img></li>`;
    }, "");

};

const reviewDetailRender = (review) => {
    document.getElementById("review-posting-no").innerText = review.posting_no;
    document.getElementById("location").innerText = review.location;
    
    // 상호명 + 점수 한번에 대입
    document.getElementById("restaurant-name").innerHTML = `${review.restaurant_name}<strong><span class="review-element" id="review-score">${review.review_score}</span></strong>`;
    
    const date = getYYYYMMDD(review.review_date);
    document.getElementById("review-date").innerText = date;
    
    document.getElementById("restaurant-comment").innerText = review.restaurant_comment;
    
    document.getElementById("restaurant-photo").outerHTML = `<img id="restaurant-photo" src="${review.restaurant_photo}" alt="">`;
};
function getYYYYMMDD(date) {
    const yyyy = date.getFullYear();
    const mm = twoDigitNum(date.getMonth() + 1);
    const dd = twoDigitNum(date.getDate());
    return `${yyyy}-${mm}-${dd}`;
}
function twoDigitNum(num) {
    return num < 10 ? "0"+num : num;
}

const init = () => {
    // 임의 데이터 추가
    addTempData();
    console.log("페이지 로드 완료");

    // 데이터 잘 들어갔는지 체크
    // console.log("객체배열로드결과 : ", reviewPostingAll);
    postingBoardRender();

    // 각 리뷰에 이벤트리스너 추가
    addOpenReviewListener();
    addcloseReviewListener();

};