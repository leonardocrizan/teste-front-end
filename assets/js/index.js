function handleSlicks() {
    $('.content__topBanner').slick({
        dots: true
    });

    $('.content__category-container').slick({
        slidesToShow: 4,
        slidesToScroll: 1
    })

    $('.content__brands-container').slick({
        slidesToShow: 6,
        slidesToScroll: 1
    })

    $('.content__extras-partners').slick({
        arrows: false,
        dots: true
    })

    $('.content__blog-container').slick({
        arrows: true,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false
    })
}

function handleArrow() {
    $('.content__shelf-item.agitado').addClass('active')
    $('.content__shelf-filter--prev').addClass('disable')

    let items = $('.content__shelf-item');
    let currentItem = items.filter('.active');

    $('.content__shelf-filter--next').on('click', function () {
        let nextItem = currentItem.next();
        currentItem.removeClass('active');
        if ( nextItem.length ) {
            currentItem = nextItem.addClass('active');
            $('.content__shelf-filter--prev').removeClass('disable')
        } else {
            $(this).addClass('disable')
        }

        if($('.content__shelf-item.active').hasClass('estressado')) {
            $(this).addClass('disable')
        }
    });

    $('.content__shelf-filter--prev').on('click', function () {
        let nextItem = currentItem.prev();
        currentItem.removeClass('active');
        if ( nextItem.length ) {
            currentItem = nextItem.addClass('active');
            $('.content__shelf-filter--next').removeClass('disable')
        } else {
            $(this).addClass('disable')
        }

        if($('.content__shelf-item.active').hasClass('agitado')) {
            $(this).addClass('disable')
        }
    })
}

function handleProducts() {
    $.ajax({
		url: 'https://627ca9a2bf2deb7174de7a47.mockapi.io/teste-front-endjunior/caoselheiro/lista-produtos/produtos/vitrine',
		success: data => {          
            data[0].products.map(function(item) {
                $('.content__shelf-productList').append(`
                <div class="content__shelf-productItem">
                    <div class="content__shelf-productItem--icons">
                        <div class="content__shelf-productItem--discount">
                            <span>40% OFF</span>
                        </div>
                        <div class="content__shelf-productItem--wishlist">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 27C16 27 3.5 20 3.5 11.5C3.50025 9.99768 4.02082 8.5418 4.97318 7.37991C5.92555 6.21801 7.25093 5.42181 8.72399 5.12669C10.197 4.83156 11.7269 5.05572 13.0533 5.76105C14.3798 6.46638 15.421 7.60935 16 8.99564L16 8.99565C16.579 7.60936 17.6202 6.46639 18.9467 5.76106C20.2731 5.05572 21.8029 4.83156 23.276 5.12669C24.7491 5.42181 26.0745 6.21801 27.0268 7.3799C27.9792 8.5418 28.4997 9.99768 28.5 11.5C28.5 20 16 27 16 27Z" stroke="#9F9F9F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="content__shelf-productItem--image">
                        <img src="../assets/images/imageProduct.png">
                    </div>
                    <div class="content__shelf-productItem--name">
                        <span>${item.productName}</span>
                    </div>
                    <div class="content__shelf-productItem--price">
                        <span>Por ${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
                    </div>
                    <div class="content__shelf-productItem--button" data=${item.productName.replaceAll(" ", "")}>
                        <button class="content__shelf-productItem--click">Adicionar</button>
                    </div>
                </div>`)

                $('.content__shelf').append(`
                <div class="content__shelf-modal" data=${item.productName.replaceAll(" ", "")}>
                    <div class="content__shelf-modal--overlay"></div>
                    <div class="content__shelf-modal--wrapper">
                        <div class="content__shelf-modal--container">
                            <div class="content__shelf-modal--image">
                                <img src="../assets/images/imageProduct.png">
                            </div>

                            <div class="content__shelf-modal--productInfo">
                                <p class="content__shelf-modal--name">${item.productName}</p>
                                <p class="content__shelf-modal--price">${item.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                                <p class="content__shelf-modal--description">${item.descriptionShort}</p>
                                <a>Ver mais detalhes do produto</a>
                            </div>

                            <svg class="content__shelf-modal--close" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="-1" x2="22.6274" y2="-1" transform="matrix(0.707107 0.707107 -0.707105 0.707109 1.84326 2.0564)" stroke="#707070" stroke-width="2"/>
                                <line y1="-1" x2="22.6274" y2="-1" transform="matrix(0.707107 -0.707107 0.707109 0.707105 2 18)" stroke="#707070" stroke-width="2"/>
                            </svg>
                        </div>
                    </div>
 
                </div>
                `)
            })


            $('.content__shelf-productItem--button').on('click', function () {
                let current = $(this).attr("data")

                $(".content__shelf").find(".content__shelf-modal[data='" + current + "']").addClass('active'); 
            })

            
            $('.content__shelf-modal--close, .content__shelf-modal--overlay').on('click', function () {
                $('.content__shelf-modal').removeClass("active")
            })

            $('.content__shelf-productList').slick({
                arrows: true,
                dots: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false
            })
        }
	});
}

$(document).ready(function() {
    handleProducts()
    handleSlicks()
    handleArrow()
})