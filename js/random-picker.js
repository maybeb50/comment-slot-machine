$(document).ready(function() {

	const comment = [
		{'id': '박봉현', 'message': '모두 행복한 연말 보내세요!'},
		{'id': '이태규', 'message': '올해는 1번이 많네요'},
		{'id': '홍길동', 'message': 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ'},
		{'id': '비욘세', 'message': '간편하고 위생적인 여행용 티슈'},
		{'id': '고구마', 'message': 'simply dummy text of the printing and typesetting industry. Lorem Ipsum h'},
	];

	const btnShuffle = document.querySelector('#casinoShuffle');
	const btnStop = document.querySelector('#casinoStop');
	const casino1 = document.querySelector('#casino1');

	let falling = false;
	let wrapper = document.getElementById('wrapper');
	let total = 30;
	let w = window.innerWidth;
	let h = window.innerHeight;

	function opnePopup(winner) {
		setTimeout(function() {
			console.log(comment[winner].id);
			$('.winner-name').text(comment[winner].id);
			$('.winner').show();
		}, 600)
	}

	function onComplete(active) {
		falling = true;
		TweenLite.set('#wrapper', {perspective: 500})
		TweenLite.set('.dot', {xPercent:'-50%',yPercent:'-50%'})

		for(let j = 0; j < 30; j++) {
			let elementDiv = document.createElement('div');
			TweenLite.set(elementDiv,{attr:{class:'dot'},x:R(0,w),y:R(-200,-150),z:R(-200,200)});
			document.body.appendChild(elementDiv);
			animm(elementDiv);
		};

		opnePopup(active);
	}

	function animm(elm){   
		TweenMax.to(elm,R(6,15),{width:'+=30', y:h+100,ease:Linear.easeNone,repeat:-1,delay:-15});
		TweenMax.to(elm,R(4,8),{width:'+=10', x:'+=100',rotationZ:R(0,180),repeat:-1,yoyo:true,ease:Sine.easeInOut});
		TweenMax.to(elm,R(2,8),{rotationX:R(0,360),rotationY:R(0,360),repeat:-1,yoyo:true,ease:Sine.easeInOut,delay:-5});
	};

	function animmDel() {
		TweenMax.killAll();
		$('.dot').remove();
	}

	function R(min,max) {return min+Math.random()*(max-min)};

	function slot() {
		const mCasino1 = new SlotMachine(casino1, {
			active: 0,
			auto: false,
		});

		btnShuffle.addEventListener('click', () => {
			animmDel();
			mCasino1.shuffle(9999);
		});

		btnStop.addEventListener('click', () => {
			mCasino1.stop(onComplete);
		});
	}

	function init() {
		for(let i = 0; i < comment.length; i++) {
			$('#casino1').append('<div class="slot">'+comment[i].id+' : '+comment[i].message+'</div>');
		};

		slot();

		$('.close').on('click', function() {
			$(this).parent().hide();
			animmDel();
		});
	};

	init();
})