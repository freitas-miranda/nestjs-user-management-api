import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';

const params = {
  nome: 'Alan Miranda',
  email: 'teste@miranda.com',
  senha: '12345678',
};

describe('UsuarioController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/usuario (POST)', async () => {
    const retorno = await request(app.getHttpServer())
      .post('/usuario')
      .send(params)
      .expect(HttpStatus.CREATED);

    expect(retorno.body).toHaveProperty('id');
    params['id'] = retorno.body.id;
  });

  it('/usuario (GET)', async () => {
    const retorno = await request(app.getHttpServer())
      .get('/usuario')
      .expect(HttpStatus.OK);

    expect(retorno.body.length).toBeGreaterThan(0);
    const usuario = retorno.body[0];
    expect(usuario).toHaveProperty('id');
    expect(usuario).toHaveProperty('nome');
    expect(usuario).toHaveProperty('email');
  });

  it('/usuario/:id (GET)', async () => {
    const retorno = await request(app.getHttpServer())
      .get('/usuario/' + params['id'])
      .expect(HttpStatus.OK);

    const usuario = retorno.body;
    expect(usuario).toHaveProperty('id');
    expect(usuario).toHaveProperty('nome');
    expect(usuario).toHaveProperty('email');
  });

  it('/usuario/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch('/usuario/' + params['id'])
      .send({ nome: 'Teste de alteração' })
      .expect(HttpStatus.OK);
  });

  it('/usuario/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/usuario/' + params['id'])
      .expect(HttpStatus.OK);
  });
});
