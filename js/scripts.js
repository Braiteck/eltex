$(() => {
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items           : 1,
		margin          : 0,
		nav             : true,
		dots            : true,
		loop            : true,
		smartSpeed      : 750,
		autoplay        : true,
		autoplayTimeout : 5000
	})


	// Каталог товаров
	$('#catalog_modal a.sub_link').click(function(e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
	})


	// Выравнивание элементов
	setHeight($('aside .cats').add('.main_slider .slide'))


	// Фильтр
	$('body').on('click', 'aside .mob_filter_link', function(e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
	})


	// Товар
	$('.product_info .images .big .slider').owlCarousel({
		items       : 1,
		margin      : 20,
		loop        : false,
		smartSpeed  : 500,
		fluidSpeed  : 100,
		dots        : false,
		mouseDrag   : false,
		touchDrag   : false,
		pullDrag    : false,
		freeDrag    : false,
		animateOut  : 'fadeOut',
		animateIn   : 'fadeIn',
		responsive: {
	        0:{
	            nav : true
	        },
	        768:{
	            nav : false
	        }
		},
		onInitialized: function(event){
			setTimeout(function(){
				setHeight($(event.target).find('.slide'))
			}, 100)
		},
		onResized: function(event){
			$(event.target).find('.slide').height('auto')

			setTimeout(function(){
				setHeight($(event.target).find('.slide'))
			}, 100)
		},
		onTranslate : (event) => {
			const parent = $(event.target).closest('.images')

			parent.find('.thumbs button').removeClass('active')
			parent.find('.thumbs button:eq(' + event.item.index + ')').addClass('active')
		}
	})

	$('.product_info .images .thumbs button, .product_info .images .view360').click(function(e) {
		e.preventDefault()

		const parent = $(this).closest('.images')

		parent.find('.big .slider').trigger('to.owl', $(this).data('slide-index'))
	})


	// Товар - выбор гарантии
	$('body').on('click', '#add_garanti_modal .list label', function(e) {
		const price    = $(this).data('price')
		const duration = $(this).data('duration')
		const name     = $(this).find('.name').text()

		const $price   = $('.product_info .info .price_block .garanti_price')
		const $garanti = $('.product_info .info .buy_info .garanti .val span')

		$price.html('+ '+ price.toLocaleString() + ' <small>руб</small>')
		$garanti.html(' + '+ duration)

		$('#quike_buy_modal .product .garanti .name').text(name)
		$('#quike_buy_modal .product .garanti').addClass('show')
	})


	// Товар - Аналогичные устройства
	$('.product_info .info .similar_link').click(function(e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			$('.product_info .similar_products').removeClass('show')
		} else {
			$(this).addClass('active')
			$('.product_info .similar_products').addClass('show')
		}
	})


	// Товар - добавление в корзину
	$('.product_info .info .buy_info .buy_link').click(function(e) {
		e.preventDefault()

		$(this).hide()
		$('.product_info .info .buy_info .amount').addClass('show')
	})


	// Копирование кода
	const clipboard = new ClipboardJS('.copy_link')

	clipboard.on('success', (e) => {
	    $(e.trigger).addClass('copied')

	    setTimeout(() => {
	    	$(e.trigger).removeClass('copied')
	    }, 2000)

	    e.clearSelection()
	})


	// Форма во всплывашке
	$('body').on('click', '.form .type label', function(e) {
		let typeInfo = $(this).data('content')
		let parent   = $(this).closest('.form')

		parent.find('.for_type').hide()
		parent.find(typeInfo).fadeIn(300)
	})


	// Поле ввода с подсказкой
	$('.form .with_tip .input').keydown(function(e) {
		let parent = $(this).closest('.with_tip')
		let _self  = $(this)

		setTimeout(function() {
			if (_self.val().length > 0) {
				// здесь запрос за данными
				parent.addClass('open').find('.datalist').addClass('show')
			} else {
				parent.removeClass('open').find('.datalist').removeClass('show')
			}
		})
	})

	$('.form .with_tip .datalist > *').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.with_tip')

		parent.find('.input').val($(this).find('.name').text())
		parent.find('.datalist').removeClass('show')
	})


	// Оформление заказа
	$('.checkout_form .block .methods label').click(function(){
		let methodInfo = $(this).data('content')
		let parent     = $(this).closest('.block')

		parent.find('.method_info').hide()
		parent.find(methodInfo).fadeIn(300)
	})


	// Залипание блока
	$('.sticky').stick_in_parent()


	// Виджет корзины
	$('#cart_widget .bottom .cart .toggle_btn').click(function(e){
		e.preventDefault()

		let parent = $(this).closest('#cart_widget')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			parent.removeClass('show')
			parent.find('.cart_info').slideUp(300)
		} else {
			$(this).addClass('active')
			parent.addClass('show')
			parent.find('.cart_info').slideDown(300)
		}
	})

	$('#cart_widget .close').click(function(e){
		e.preventDefault()

		$('#cart_widget .bottom .cart .toggle_btn').removeClass('active')
		$('#cart_widget').removeClass('show')
		$('#cart_widget .cart_info').slideUp(300)
	})


	// Полный прайс лист
	$('.get_price_list .mob_form_btn').click(function(e) {
		e.preventDefault()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next().slideUp(300)
		} else {
			$(this).addClass('active').next().slideDown(300)
		}
	})


	// Отправка форм
	$('body').on('submit', '#best_price_modal .form', (e) => {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src       : '#success_best_price_modal',
			type      : 'inline',
			touch     : false,
			afterShow : (instance, current) => {
				setTimeout(() => {
					$.fancybox.close()
				}, 4000)
			}
		})
	})


	$('body').on('submit', '.feedback .form', (e) => {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src       : '#success_feedback_modal',
			type      : 'inline',
			touch     : false,
			afterShow : (instance, current) => {
				setTimeout(() => {
					$.fancybox.close()
				}, 4000)
			}
		})
	})


	$('body').on('submit', '#invoice_modal .form', (e) => {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src   : '#success_invoice_modal',
			type  : 'inline',
			touch : false
		})
	})
})



$(window).load(() => {
	// Выравнивание элементов в сетке
	$('.products .flex').each(function() {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.products .flex').each(function() {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



// Выравнивание решений
function productHeight(context, step) {
	let start    = 0
	let finish   = step
	let products = context.find('.product_wrap')

	products.height('auto').find('.name, .desc').height('auto')

	for (let i = 0; i < products.length; i++) {
		setHeight(products.slice(start, finish).find('.name'))
		setHeight(products.slice(start, finish).find('.desc'))
		setHeight(products.slice(start, finish))

		start  = start + step
		finish = finish + step
	}
}