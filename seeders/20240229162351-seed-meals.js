"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("meals", [
      {
        //id 1
        user_id: null,
        meal_name: "Salmon Snout Smacker",
        meal_description:
          "Succulent oven-baked Norwegian salmon, served on a bed of crunchy potatoes and crispy broccoli.",
        base_price: 4,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 2
        user_id: null,
        meal_name: "Big Beefy Bowl",
        meal_description:
          "Ground beef, mixed with brown rice and topped with diced bell peppers and fresh spinach.",
        base_price: 4,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 3
        user_id: null,
        meal_name: "Turkey Treat",
        meal_description:
          "A premium option! Roasted turkey tenderloin, alongside a serving of juicy cranberries, sautéed zucchini, and a generous serving of quinoa.",
        base_price: 4.5,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 4
        user_id: null,
        meal_name: "Cod Crunch",
        meal_description:
          "Fried cod fillet, served with a medley of diced apples, carrots, and air-fried sweet potatoes.",
        base_price: 3,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 5
        user_id: null,
        meal_name: "Pork Potato Platter",
        meal_description:
          "Slow roasted pork, seasoned with rosemary and served alongside a hearty helping of creamy mashed potatoes and a side of steamed green beans.",
        base_price: 4,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 6
        user_id: null,
        meal_name: "Chicken Casserole",
        meal_description:
          "Tender chunks of chicken breast mixed with diced apples and cooked brown rice, baked until golden brown.",
        base_price: 3,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 7
        user_id: null,
        meal_name: "Lamb and Lentil Stew",
        meal_description:
          "Succulent pieces of lamb simmered with lentils, carrots, and spinach in a savory broth.",
        base_price: 4,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 8
        user_id: null,
        meal_name: "Cheesy Chicken Chompers",
        meal_description:
          "Ground chicken mixed with shredded cheese and rolled into bite-sized meatballs, air-fried until golden and crispy.",
        base_price: 2,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id 9
        user_id: 1,
        meal_name: "Cheesy Chicken Chompers",
        meal_description:
          "Ground chicken mixed with shredded cheese and rolled into bite-sized meatballs, air-fried until golden and crispy.",
        base_price: 2,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("meals");
  },
};
