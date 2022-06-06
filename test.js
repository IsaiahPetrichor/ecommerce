import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './index.js';
import dotenv from 'dotenv';
dotenv.config();

chai.use(chaiHttp);
chai.should();

let jwtToken = '';
chai
	.request(server)
	.post('/api/login')
	.send({ email: 'isaiahleach27@gmail.com', password: process.env.TEST_PASS })
	.end((err, result) => {
		jwtToken = result.body.jwt_token;
	});

console.log(jwtToken);

describe('API tests', () => {
	describe('Users API', () => {
		// test GET for all users (requires admin auth in production)
		it('It returns an array of all users in the database', (done) => {
			chai
				.request(server)
				.get('/api/users/all')
				.set('Accept', 'application/json')
				.set('content-type', 'application/json')
				.set('authorization', `Bearer ${jwtToken}`)
				.end((err, result) => {
					result.should.have.status(200);
					result.body.should.be.a('array');
					result.body.length.should.not.be.eq(0);
					done();
				});
		});

		// test GET for authenticated user
		it('Returns user data', (done) => {
			chai
				.request(server)
				.get('/api/users')
				.set('Accept', 'application/json')
				.set('content-type', 'application/json')
				.set('authorization', `Bearer ${jwtToken}`)
				.end((err, result) => {
					result.should.have.status(200);
					result.body.should.be.a('object');
					done();
				});
		});
	});
});
