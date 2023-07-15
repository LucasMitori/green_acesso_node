/* -------------------- Lotes Space --------------------*/

/**
 * @swagger
 * tags:
 *   name: Lotes
 *   description: Rotas de Lotes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ILoteRequest:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           required: true
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           required: true
 *         ativo:
 *           type: boolean
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *         isAdmin:
 *           type: boolean
 *           required: false
 *     UserUpdateResponse:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: "John"
 *           required: true
 *         lastName:
 *           type: string
 *           example: "Wick"
 *           required: true
 *         gender:
 *           type: string
 *           example: "male"
 *           enum: [male, female, other]
 *           required: true
 *         address:
 *           type: string
 *           example: "Street of SunFlowers"
 *           required: true
 *         number:
 *           type: string
 *           example: "176D"
 *           required: true
 *         complement:
 *           type: string
 *           example: "house with lots of windows"
 *           required: true
 *         city:
 *           type: string
 *           example: "Los Angeles"
 *           required: true
 *         state:
 *           type: string
 *           example: "California"
 *           required: true
 *         country:
 *           type: string
 *           example: "USA"
 *           required: true
 *         postalCode:
 *           type: string
 *           example: "pencil"
 *           required: true
 *         email:
 *           type: string
 *           example: "John.wick@assassin.com"
 *           required: true
 *         password:
 *           type: string
 *           example: "DontKillMyDog"
 *           required: true
 *         cellphone:
 *           type: string
 *           example: "11977492121"
 *           required: true
 *         cpfCnpj:
 *           type: string
 *           example: "47495862411"
 *           required: true
 *         foreignerDocument:
 *           type: string
 *           example: "Dont have"
 *           required: false
 *         image:
 *           type: string
 *           example: "https://pt.wikipedia.org/wiki/John_Wick#/media/Ficheiro:John_wick_ver3.jpg"
 *           nullable: true
 *         isAdmin:
 *           type: boolean
 *           example: false
 *           required: false
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         address:
 *           type: string
 *         number:
 *           type: string
 *         complement:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         postalCode:
 *           type: string
 *         email:
 *           type: string
 *         cellphone:
 *           type: string
 *         cpfCnpj:
 *           type: string
 *         foreignerDocument:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the given information
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: The newly registered user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     description: Retrieve a list of all users in the system
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user profile
 *     description: Retrieve a user profile by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The requested user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update user data
 *     description: Update a user's data by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: body
 *         name: user
 *         description: The user to update
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/UserRequest'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The updated user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserUpdateResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a user account
 *     description: Delete a user's account by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User account deleted
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/* -------------------- Login Space --------------------*/

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Rota de login de usuário
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     AuthToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faça o login com um usuário
 *     description: Rota de login, necessário envio de e-mail e senha.
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       400:
 *         description: Invalid input data
 */

/* -------------------- Product Space --------------------*/

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Rota de Produtos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductRegister:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *           required: false
 *         category:
 *           type: string
 *           required: true
 *         instock:
 *           type: number
 *           required: true
 *         tags:
 *           type: array
 *           required: true
 *         reviews:
 *           type: array
 *           required: true
 *         productAvailable:
 *           type: boolean
 *           required: true
 *         price:
 *           type: number
 *           required: true
 *         discount:
 *           type: number
 *           required: true
 *     ProductRegisterResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: id
 *           example: 1
 *           required: false
 *         name:
 *           type: string
 *           example: "Crystal slipper"
 *           required: true
 *         description:
 *           type: string
 *           example: "Crystal splipper used to show whimsy of its user"
 *         imageUrl:
 *           type: string
 *           example: "https://img.freepik.com/vetores-gratis/sapato-de-cristal-cinderela_23-2148470395.jpg?w=826&t=st=1683655036~exp=1683655636~hmac=76270c56d55918173d8113455ffb37647230c50d376eefe1b30a89eada94a539"
 *         category:
 *           type: string
 *           example: "Shoes"
 *         instock:
 *           type: number
 *           example: 100
 *         tags:
 *           type: array
 *           example: ["shoes", "crystal", "slipper"]
 *         reviews:
 *           type: array
 *           example: ["good and confortable", "slipper with style"]
 *         productAvailable:
 *           type: boolean
 *           example: true
 *         price:
 *           type: number
 *           example: 2000
 *         discount:
 *           type: number
 *           example: 15
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     description: Returns a list of all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductRegister'
 *
*   post:
 *     summary: Register a new product
 *     description: Register a new product with the provided details
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: New product details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRegister'
 *     responses:
 *       201:
 *         description: The newly created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRegisterResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             oneOf:
 *               - $ref: '#/components/responses/BadRequest'
 *               - $ref: '#/components/responses/Unauthorized'
 *               - $ref: '#/components/responses/NotFound'

 */

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     summary: Update a product by ID
 *     description: Update a product by its normal ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: Product object to update
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductRegister'
 *     responses:
 *       200:
 *         description: Successful operation. Returns the updated product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductRegister'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a product by ID
 *     description: Delete a product by its normal ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation. Returns no content
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/* -------------------- Purchase Space --------------------*/

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Rota de Compras
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PurchaseRegister:
 *       type: object
 *       properties:
 *         paymentID:
 *           type: number
 *           required: true
 *         purchaseStatus:
 *           type: string
 *           required: true
 *         qrCode:
 *           type: string
 *           required: false
 *         quantity:
 *           type: number
 *           required: true
 *     PurchaseRegisterResponse:
 *       type: object
 *       properties:
 *         paymentID:
 *           type: number
 *           example: 123456789
 *           required: true
 *         purchaseStatus:
 *           type: string
 *           example: "PENDENTE"
 *           required: true
 *         qrCode:
 *           type: string
 *           example: "qrcode link"
 *           required: false
 *         quantity:
 *           type: number
 *           example: 10
 *           required: true
 *         total:
 *           type: number
 *           example: 12000
 *           required: true
 *         userId:
 *           type: uuid
 *           example: "04e3ec54-0f3b-4a6d-9c62-d2e1b3858f43"
 *           required: false
 *     ProductPurchase:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *           required: true
 *         name:
 *           type: string
 *           example: "Crystal slipper"
 *           required: true
 *         price:
 *           type: number
 *           example: 120
 *           required: true
 *         quantity:
 *           type: number
 *           example: 10
 *           required: true
 *         total:
 *           type: number
 *           example: 12000
 *           required: true
 *         discount:
 *           type: number
 *           example: 12
 *           required: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           required: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           required: false
 *     PurchaseListAll:
 *       type: object
 *       properties:
 *         paymentID:
 *           type: number
 *           example: 1
 *         purchaseStatus:
 *           type: string
 *           example: "PENDENTE"
 *         qrCode:
 *           type: string
 *           example: "qrcode Link"
 *     PersonalPurchases:
 *       type: object
 *       properties:
 *         paymentID:
 *           type: number
 *           required: true
 *         purchaseStatus:
 *           type: string
 *           required: true
 *         qrCode:
 *           type: string
 *           required: false
 *         quantity:
 *           type: number
 *           required: true
 *         user:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/UserResponse'
 */

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: List all purchases
 *     description: Returns a list of all registered purchases
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseListAll'
 *
 *   post:
 *     summary: Register a new purchase
 *     description: Register a new purchase with the provided details
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: New purchase details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseRegister'
 *     responses:
 *       201:
 *         description: The newly created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseRegisterResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     summary: List Personal Purchases
 *     description: List all the purchases made by one user
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a list of all the purchases made by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 type: "object"
 *                 properties:
 *                   product_purchases:
 *                     type: "array"
 *                     items:
 *                       type: "object"
 *                       properties:
 *                         updatedAt:
 *                           type: "string"
 *                           format: "date-time"
 *                         createdAt:
 *                           type: "string"
 *                           format: "date-time"
 *                         total:
 *                           type: "number"
 *                           format: "float"
 *                         quantity:
 *                           type: "integer"
 *                         discount:
 *                           type: "number"
 *                           format: "float"
 *                         price:
 *                           type: "number"
 *                           format: "float"
 *                         name:
 *                           type: "string"
 *                         id:
 *                           type: "integer"
 *                     description: "Array of purchased products"
 *                   qrCode:
 *                     type: "string"
 *                     description: "QR code string"
 *                   purchaseStatus:
 *                     type: "string"
 *                     description: "Purchase status"
 *                   paymentID:
 *                     type: "integer"
 *                     description: "Payment ID"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a purchase by ID
 *     description: Delete a purchase by its normal ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the purchase to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful operation. Returns no content
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
