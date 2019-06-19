/*
 - pointed functors -

 of:: a -> F a
 aka: pure, return, unit, point

 a functor w/ a map and an of
*/

/*
 - monads -

 nested compuations
 aka: mjoin, chain

 mjoin :: M M a -> M a
 chain :: (a -> M b) -> M a -> M b

 Pointed functor + mjoin|chain = monad

*/

// jsbin.com/woweg

// https://jsbin.com/xahanilepi
