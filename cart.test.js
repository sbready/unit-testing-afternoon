const cart = require('./cart')
    , cars = require('./data/cars')

describe('Cart Properties:', () => {

    test('Cart should default to an empty array', () => {
        expect( Array.isArray( cart.cart ) ).toEqual( true )
        expect( cart.cart.length ).toEqual( 0 )
    })

    test('Cart total property should equal 0', () => {
        expect( cart.total ).toEqual( 0 )
    })

})

describe('Cart Methods:', () => {

    afterEach( () => {
        cart.cart = []
        cart.total = 0
    })

    test('addToCart() should add a car object to the cart array', () => {
        cart.addToCart( cars[0] )
        cart.addToCart( cars[1] )

        expect( cart.cart.length ).toEqual( 2 )
        expect( cart.cart[0] ).toEqual( cars[0] )
        expect( cart.cart[1] ).toEqual( cars[1] )
    })

    test('addToCart() should increase total property by 1', () => {
        cart.addToCart( cars[0] )
        cart.addToCart( cars[5] )
        cart.addToCart( cars[7] )

        expect( cart.total ).toEqual( cars[0].price + cars[5].price + cars[7].price )
    })

    test('removeFromCart() should subtract a car object from the cart array', () => {
        cart.addToCart( cars[0] )
        cart.addToCart( cars[5] )
        cart.addToCart( cars[7] )

        cart.removeFromCart( 1, cars[5].price )

        expect( cart.cart.length ).toEqual( 2 )
        expect( cart.cart[0] ).toEqual( cars[0] )
        expect( cart.cart[1] ).toEqual( cars[7] )
    })

    test('removeFromCart() should decrease total property', () => {
        cart.addToCart( cars[0] )
        cart.addToCart( cars[5] )
        cart.addToCart( cars[7] )

        cart.removeFromCart( 0, cars[0].price )
        cart.removeFromCart( 1, cars[5].price )

        expect( cart.total ).toEqual( cars[7].price )
    })

    test('checkout() should reset cart array and total to 0', () => {
        cart.addToCart( cars[0] )
        cart.addToCart( cars[1] )
        cart.addToCart( cars[2] )

        cart.checkout()

        expect( cart.cart.length ).toEqual( 0 )
        expect( cart.total ).toEqual( 0 )
    })

})