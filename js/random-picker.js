$(document).ready(function() {

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
			// console.log('winner', winner);
			// console.log('commentList.length', commentList.length);

			if(winner === commentList.length) {
				$('.winner-name').text(commentList[0].name);
			} else {
				$('.winner-name').text(commentList[winner].name);
			};
			
			$('.winner').show();
		}, 700);
	}

	function onComplete(active) {
		console.log('onComplete 실행');

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
		$('.winner-name').text('');
	}

	function R(min,max) {return min+Math.random()*(max-min)};

	function slot() {
		mCasino1 = new SlotMachine(casino1, {
			active: 0,
			auto: false,
		});

		$('.slotMachineContainer').children().eq(2).addClass('on');

		btnShuffle.addEventListener('click', () => {
			const randomNum = Math.ceil(Math.random()*(20-10+1))+10;
			console.log(randomNum);
			$('.winner').hide();
			animmDel();
			mCasino1.shuffle(randomNum, function(active) {
				stop(active+1);
			});
		});
		// btnStop.addEventListener('click', () => {
		// 	mCasino1.stop(onComplete);
		// });
	}
	
	function stop(active) {
		onComplete(active);
	}

	function init() {
		for(let i = 0; i < commentList.length; i++) {
			$('#casino1').append('<div class="slot">'+commentList[i].name+' : '+commentList[i].comment+'</div>');
		};

		slot();

		$('.close').on('click', function() {
			$(this).parent().hide();
			animmDel();
		});
	};

	init();
})