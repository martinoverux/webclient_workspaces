
    $(function(){
        $('.main-visual .slider-box').bxSlider({
            auto:true,
            pause:5000,
            autoControls: true,
            autoStart : true,
            controls:false
        })
		
		var touchEnbl_ = false;
		var mobile_filter_ = "win16|win32|win64|mac|macintel";
		if(navigator.platform){
			if(mobile_filter_.indexOf(navigator.platform.toLowerCase()) < 0){
				touchEnbl_ = true;
			}
		}
        $('.slider-box').bxSlider({
            auto:true,
            pause:5000,
			touchEnabled : touchEnbl_,
            autoControls: true,
            autoStart : true,
            pager:false
        });
		$('.popupzone_click').click(function(){
			var this_name = $(this).attr('data-title');
			var this_group = "CGGpopupzone";
			var this_id = $(this).attr('data-id');
			console.log(this_id);
			if(this_id != undefined){
				$.ajax({
					type: 'post',
					url : 'https://www.cha.go.kr/main/mainclickstatistic.jsp',
					data: {data_name: this_name, data_group: this_group, data_id: this_id},
					async: false, success: function(data){}, error: function(){}
				});
			}
		});
		
        /*
         $('#gnb li').mouseenter(function(){
         $('#dep2').show();
         $('#dep2 .in > div').eq($(this).index()).show().siblings().hide();
         });
         $('#dep2').mouseenter(function(){
         $(this).show();
         });
         $('#gnb li,#dep2').mouseleave(function(){
         $('#dep2').hide();
         })
         */

        $('#gnb > ul > li > a').focus(function(){
            $(this).next().show();
        })
        $('.dep2 ul li:last-child').focusout(function(){
            $('.dep2').hide();
        })

    })
 
function Slider(target, type) {
  // 상태
  let index = 1;
  let isMoved = true;
  const speed = 1000; // ms

  // 방향
  const transform = "transform " + speed / 1000 + "s";
  let translate = (i) => "translateX(-" + 100 * i + "%)";
  if (type === "V") {
    translate = (i) => "translateY(-" + 100 * i + "%)";
  }

  // 슬라이더
  const slider = document.querySelector(target);
  const sliderRects = slider.getClientRects()[0];
  slider.style["overflow"] = "hidden";

  // 슬라이더 화면 컨테이너
  const container = document.createElement("div");
  container.style["display"] = "flex";
  container.style["flex-direction"] = type === "V" ? "column" : "row";
  container.style["width"] = sliderRects.width + "px";
  container.style["height"] = sliderRects.height + "px";
  container.style["transform"] = translate(index);

  // 슬라이더 화면 목록
  let boxes = [].slice.call(slider.children);
  boxes = [].concat(boxes[boxes.length - 1], boxes, boxes[0]);

  // 슬라이더 화면 스타일
  const size = boxes.length;
  for (let i = 0; i < size; i++) {
    const box = boxes[i];
    box.style["flex"] = "none";
    box.style["flex-wrap"] = "wrap";
    box.style["height"] = "100%";
    box.style["width"] = "100%";
    container.appendChild(box.cloneNode(true));
  }

  // 처음/마지막 화면 눈속임 이벤트
  container.addEventListener("transitionstart", function () {
    isMoved = false;
    setTimeout(() => {
      isMoved = true;
    }, speed);
  });
  container.addEventListener("transitionend", function () {
    // 처음으로 순간이동
    if (index === size - 1) {
      index = 1;
      container.style["transition"] = "none";
      container.style["transform"] = translate(index);
    }
    // 끝으로 순간이동
    if (index === 0) {
      index = size - 2;
      container.style["transition"] = "none";
      container.style["transform"] = translate(index);
    }
  });

  // 슬라이더 붙이기
  slider.innerHTML = "";
  slider.appendChild(container);

  return {
    move: function (i) {
      if (isMoved === true) {
        index = i;
        container.style["transition"] = transform;
        container.style["transform"] = translate(index);
      }
    },
    next: function () {
      if (isMoved === true) {
        index = (index + 1) % size;
        container.style["transition"] = transform;
        container.style["transform"] = translate(index);
      }
    },
    prev: function () {
      if (isMoved === true) {
        index = index === 0 ? index + size : index;
        index = (index - 1) % size;
        container.style["transition"] = transform;
        container.style["transform"] = translate(index);
      }
    }
  };
}

const s1 = new Slider("#slider1", "H");
const s2 = new Slider("#slider2", "V");

setInterval(() => {
  s1.next();
  s2.next();
}, 1000)
