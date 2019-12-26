module.exports = {
    dbUrl: 'mongodb://localhost:27017/gsm',
    admin: {
      id: 'admin',
      pwd: '1234',
      name: '관리자'
    },
    jwt: {
      secretKey: 'gsm',
      issuer: 'xxx.com',
      subject: 'user-token',
      algorithm: 'HS256',    
      expiresIn: 60 * 3, // 기본 3분
      expiresInRemember: 60 * 60 * 24 * 7, // 기억하기 눌렀을 때 7일
      expiresInDiv: 3, // 토큰시간 나누는 기준
    }
  }
