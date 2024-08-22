'use strict';
/* -------------------------------------------------------------------------- */
//-                °    EXPRESSJS - BLOG Project with Mongoose                */
/* -------------------------------------------------------------------------- */

//? Call Models :
const { BlogCategory, BlogPost } = require('../models/blogModel');

/* -------------------------------------------------------------------------- */
//? BlogCategory Controller :

module.exports.BlogCategory = {
   list: async (req, res) => {
      // const data = await BlogCategory.find();
      const data = await res.getModelList(BlogCategory);

      res.status(200).send({
         error: false,
         details: await res.getModelListDetails(BlogCategory),
         result: data,
      });
   },

   //, CRUD  ->

   create: async (req, res) => {
      // res.send("Create Method");

      const data = await BlogCategory.create(req.body);
      // console.log(data);
      res.status(201).send({
         error: false,
         result: data,
      });
   },

   read: async (req, res) => {
      // const categoryId = req.params.categoryId
      // const data = await BlogCategory.findOne({ _id: categoryId })

      // const data = await BlogCategory.findOne({ ...filter })
      const data = await BlogCategory.findOne({ _id: req.params.categoryId });
      // const data = await BlogCategory.findById( req.params.categoryId )

      res.status(200).send({
         error: false,
         result: data,
      });
   },

   update: async (req, res) => {
      // const data = await BlogCategory.updateOne({ ...filter }, { ...data });
      const data = await BlogCategory.updateOne(
         { _id: req.params.categoryId },
         req.body
      );
      // const data = await BlogCategory.findByIdAndUpdate(req.params.categoryId, req.body)

      res.status(200).send({
         error: false,
         result: data, // Güncelleme işleminin sayısal değerleri.
         new: await BlogCategory.findOne({ _id: req.params.categoryId }), // Güncellenmiş datayı göster.
      });
   },

   delete: async (req, res) => {
      const data = await BlogCategory.deleteOne({
         _id: req.params.categoryId,
      });
      console.log(data);

      if (data.deletedCount >= 1) {
         res.sendStatus(204); // No Content
      } else {
         res.status(404).send({
            error: true,
            message: 'Blog category not found.',
         });
      }
   },
};

/* -------------------------------------------------------------------------- */
//? BlogPost Controller :

module.exports.BlogPost = {
   list: async (req, res) => {
      //- FILTERING & SEARCHING & SORTING & PAGINATION

      //__ FILTERING:

      // URL?filter[fieldName1]=value1&filter[fieldName2]=value2
      // const filter = req.query?.filter || {};
      // console.log(filter);

      // const data = await BlogPost.find(filter);

      //__ SEARCHING:

      // URL?search[fieldName1]=value1&search[fieldName2]=value2
      // const search = req.query?.search || {};
      // console.log(search);
      //* https://www.mongodb.com/docs/manual/reference/operator/query/regex/
      // for (let key in search) search[key] = { $regex: search[key] }; //, içinde arama yapmak diye regex kullanırız.
      // console.log(search);

      // const data = await BlogPost.find({ ...filter, ...search });

      //__ SORTING:

      // Cancelled: URL?sort[fieldName1]=1&sort[fieldName2]=-1 // Mongoose 8.0 > deprecated
      // URL?sort[fieldName1]=asc&sort[fieldName2]=desc
      // const sort = req.query?.sort || {};
      // console.log(sort);

      // const data = await BlogPost.find({ ...filter, ...search }).sort(sort);

      // //__ PAGINATION:

      // URL?page=3&limit=15&skip=20
      // //? LIMIT:
      // let limit = Number(req.query?.limit);
      // limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20);
      // console.log(limit, typeof limit);

      // //? PAGE:
      // let page = Number(req.query?.page);
      // page = page > 0 ? page : 1;

      // //? SKIP:
      // let skip = Number(req.query?.skip);
      // skip = skip > 0 ? skip : (page - 1) * limit;

      // //__ RUN:

      // const data = await BlogPost.find({ ...filter, ...search })
      //    .sort(sort)
      //    .skip(skip)
      //    .limit(limit);

      // const data = await BlogPost.find({ ...filter, ...search })
      //    .sort(sort)
      //    .skip(skip)
      //    .limit(limit)
      //    .populate('categoryId');

      /* -------------------------------------------------------------------------- */

      // const data = await BlogPost.find({ ...filter }, { ...select })
      // const data = await BlogPost.find({}, { _id: 0, categoryId: 1, title: 1, content: 1 })
      //, Sadece belirttiğimiz değerlerin çıktısını alırız.
      // const data = await BlogPost.find(
      //    {},
      //    { categoryId: true, title: true, content: true }
      // ).populate('categoryId');

      // const data = await BlogPost.find().populate('categoryId');

      const data = await res.getModelList(BlogPost, 'categoryId');

      res.status(200).send({
         error: false,
         result: data,
      });
   },

   // CRUD ->

   create: async (req, res) => {
      //.. "message": "BlogPost validation failed: userId: Path `userId` is required." ( Çözümü Aşağıda )
      req.body.userId = req.user?._id; //? ID'i otomatik almak için.
      req.body.content += ` Author: ${req.user?.firstName} ${req.user?.lastName}`;

      const data = await BlogPost.create(req.body);

      res.status(201).send({
         error: false,
         result: data,
      });
   },

   read: async (req, res) => {
      const data = await BlogPost.findOne({ _id: req.params.postId }).populate(
         'categoryId'
      );
      // const data = await BlogPost.findOne({ _id: req.params.postId }, { categoryId: true, title: true, content: true })

      res.status(200).send({
         error: false,
         result: data,
      });
   },

   update: async (req, res) => {
      const data = await BlogPost.updateOne(
         { _id: req.params.postId },
         req.body
      );

      res.status(202).send({
         error: false,
         result: data, // Güncelleme işleminin sayısal değerleri.
         new: await BlogPost.findOne({ _id: req.params.postId }), // Güncellenmiş datayı göster.
      });
   },

   delete: async (req, res) => {
      const data = await BlogPost.deleteOne({ _id: req.params.postId });

      if (data.deletedCount >= 1) {
         res.sendStatus(204);
      } else {
         res.errorStatusCode = 404;
         throw new Error('Not Found.');
      }
   },
};
