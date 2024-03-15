const BaseController = require("./BaseController");

//Add a photo url link?
class CartController extends BaseController {
  constructor(model, mealModel, cartMealModel) {
    super(model);
    this.mealModel = mealModel;
    this.cartMealModel = cartMealModel;
  }

  //method to get all carts associated with the user, including completed ones.
  //tested
  async getUserCarts(req, res) {
    console.log("getUserCarts is being called.");
    const { userId } = req.params;

    const carts = await this.model.findAll({
      where: { userId: userId },
    });

    return res.json(carts);
  }

  //tested
  //after cart is changed to be completed, make a new cart that's empty of any meals.
  async addCart(req, res) {
    const { userId, totalPrice, completed } = req.body;
    //total price is supposed to be 0.
    //completed is supposed to be false.
    //userId is the id of the person who is logged in right now
    try {
      const newCart = await this.model.create({
        userId: userId,
        totalPrice: totalPrice,
        completed: completed,
      });
      return res.json(newCart);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //update the details of the cart (mark it as completed, change the total price etc)
  //tested
  async updateCart(req, res) {
    console.log("updateCart is being called.");
    const { completed, totalPrice } = req.body;
    const { userId } = req.params;

    console.log("userId", userId);
    try {
      let cart_data = await this.model.findOne({
        where: { userId: userId, completed: false },
      });
      if (cart_data == null) {
        throw new Error(
          "Cart you are trying to edit does not exist in the database."
        );
      }
      console.log("i got past the error handling");
      await this.model.update(
        {
          userId: userId,
          totalPrice: totalPrice,
          completed: completed,
        },
        {
          where: {
            userId: userId,
            completed: false,
          },
        }
      );
      console.log("i got past model.update");

      const updatedCart = await this.model.findOne({
        where: {
          userId: userId,
          completed: completed,
        },
      });

      return res.json(updatedCart);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //method to get the cart with the correct userid
  //get the cart id
  //get all of the rows with that cartid and where the completed is not true
  //tested.
  async getUserCurrentCartMeals(req, res) {
    console.log("getUserCurrentCartMeals is being called.");
    const { userId } = req.params;

    const cart = await this.model.findOne({
      where: { userId: userId, completed: false },
      //give me the data that's associated with mealModel (fetching the associations?)
      include: this.mealModel,
    });

    const current_cart_id = cart.id;

    console.log("current_cart_id", current_cart_id);
    const current_cart_meals = await this.cartMealModel.findAll({
      where: { cartId: current_cart_id },
    });

    console.log("current_cart_meals", current_cart_meals);

    return res.json(cart.meals);
  }

  async addUserCurrentCartMeals(req, res) {
    console.log("updateUserCurrentCartMeals is being called.");
    const { mealId } = req.body;

    const { userId } = req.params;

    //NEXT TIME, DANA, FUCKING USE findOrCreate
    var cart = await this.model.findOne({
      where: { userId: userId, completed: false },
    });

    //if cart is null, create cart for user and set that as a cart.

    if (!cart) {
      //total price is supposed to be 0.
      //completed is supposed to be false.
      //userId is the id of the person who is logged in right now
      const newCart = await this.model.create({
        userId: userId,
        totalPrice: 0,
        completed: false,
      });
      cart = newCart;
    }

    const current_cart_id = cart.id;

    const new_cart_meals_entry = await this.cartMealModel.create({
      cartId: current_cart_id,
      mealId: mealId,
    });

    return res.json(new_cart_meals_entry);
  }
}

module.exports = CartController;
