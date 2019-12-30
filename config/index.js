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
      expiresIn: 60 * 20, // 기본 20분
      expiresInRemember: 60 * 60 * 3, // 기억하기 눌렀을 때 3시간
      expiresInDiv: 3, // 토큰시간 나누는 기준
    }
  }
