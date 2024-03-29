# this용법

1. inline 이벤트 속성에 기술된 this는 태그 객체 자신이다.
```html
<input type="checkbox" name="subject" id="subject1" onchange="subjectChanged(this);">
```


2. 일반 함수 안에서 사용된 this는 전역객체 window를 가리킨다. 전역에 선언된 화살표 함수는 전역의 this를 가져다 쓴다.
```js
        function test12() {
            console.log(this);
            console.log(this === window); // true
        }
```

3. 화살표 함수 안에서 사용된 this는 부모환경의 this를 가져다 쓴다.
```js
        const test13 = () => {
            console.log(this);
            console.log(this === window); // true
        };
```

4. 객체의 일반 함수 안에서의 this는 현재 객체를 가리킨다.
```js
        const obj = {
            id : 'honggd',
            getId : function(){
                // 부모의 this 현재 객체
                (() => {
                    console.log('getId 안의 화살표 함수', this); // 부모의 this
                }) ();
                return this.id;
            }
        }
        console.logt(obj.getId());
```
5. 생성자함수에서 this는 현재객체를 가리킨다.
```js
        function Pet(name, breed, weight, age, color){
            this.name = name;
            this.breed = breed;
            this.weight = weight;
            this.age = age;
            this.color = color;
            this.bark = function(){
                console.log(this.weight < 10 ? '왈왈' : '멍멍');
            };
        }
```

6. 이벤트핸들러함수(일반함수) 안의 this는 이벤트발생객체를 가리킨다.
```js
      btn.onclick = function(e){
        console.log(e);
        const {target} = e;
        console.log(target); // 이벤트 발생객체 #btn
        console.log(this); // 이벤트발생객체 #btn
        console.log(target === this); // true
      };
```


