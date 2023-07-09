const allowedCors = [
    'https://praktikum.tk',
    'http://praktikum.tk',
    'localhost:3000'
  ];

  app.use(function(req, res, next) {
    const { origin } = req.headers;
    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
  
    next();
  });