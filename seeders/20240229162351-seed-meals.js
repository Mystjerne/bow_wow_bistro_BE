"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("meals", [
      {
        //id 1
        user_id: null,
        meal_name: "Salmon Snout Smacker",
        meal_photo:
          "https://images.pexels.com/photos/3659862/pexels-photo-3659862.jpeg",
        meal_description:
          "Succulent oven-baked Norwegian salmon, served on a bed of crunchy potatoes and crispy broccoli.",
        base_price: 4,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 2
        user_id: null,
        meal_name: "Big Beefy Bowl",
        meal_photo:
          "https://images.pexels.com/photos/1618914/pexels-photo-1618914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "Ground beef, mixed with brown rice and topped with diced bell peppers and fresh spinach.",
        base_price: 4,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 3
        user_id: null,
        meal_name: "Turkey Treat",
        meal_photo:
          "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "A premium option! Roasted turkey tenderloin, alongside a serving of juicy cranberries, sautéed zucchini, and a generous serving of quinoa.",
        base_price: 4.5,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 4
        user_id: null,
        meal_name: "Cod Crunch",
        meal_photo:
          "https://images.pexels.com/photos/19034918/pexels-photo-19034918/free-photo-of-fried-fish-and-chips-sprinkled-with-parsley.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "Fried cod fillet, served with a medley of diced apples, carrots, and air-fried sweet potatoes.",
        base_price: 3,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 5
        user_id: null,
        meal_name: "Pork Potato Platter",
        meal_photo:
          "https://images.pexels.com/photos/8753745/pexels-photo-8753745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "Slow roasted pork, seasoned with rosemary and served alongside a hearty helping of creamy mashed potatoes and a side of steamed green beans.",
        base_price: 4,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 6
        user_id: null,
        meal_name: "Chicken Casserole",
        meal_photo:
          "https://images.pexels.com/photos/10309477/pexels-photo-10309477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "Tender chunks of chicken breast mixed with diced apples and cooked brown rice, baked until golden brown.",
        base_price: 3,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 7
        user_id: null,
        meal_name: "Lamb and Lentil Stew",
        meal_photo:
          "https://images.pexels.com/photos/17019386/pexels-photo-17019386/free-photo-of-soup-in-bowl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "Succulent pieces of lamb simmered with lentils, carrots, and spinach in a savory broth.",
        base_price: 4,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 8
        user_id: null,
        meal_name: "Cheesy Chicken Chompers",
        meal_photo:
          "https://images.pexels.com/photos/5837092/pexels-photo-5837092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "Ground chicken mixed with shredded cheese and rolled into bite-sized meatballs, air-fried until golden and crispy.",
        base_price: 2,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        //id 9
        user_id: 1,
        meal_name: "Cheesy Chicken Chompers",
        meal_photo:
          "https://images.pexels.com/photos/5837092/pexels-photo-5837092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        meal_description:
          "Ground chicken mixed with shredded cheese and rolled into bite-sized meatballs, air-fried until golden and crispy.",
        base_price: 2,
        availability: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("meals");
  },
};
