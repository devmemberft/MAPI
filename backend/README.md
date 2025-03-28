## Features
- Verificación de roles/permiso: En métodos de actualización o eliminación, podrías agregar una verificación para asegurar que el usuario que realiza la acción tenga los permisos adecuados. Si tu sistema tiene roles, sería una buena idea verificar que el usuario que intenta realizar la acción es el propietario del recurso o tiene un rol adecuado (administrador, por ejemplo).

- Soft delete (eliminación suave): En lugar de eliminar usuarios permanentemente, podrías optar por una "eliminación suave" (soft delete), donde solo marcas a los usuarios como eliminados, pero sigues guardando sus datos en la base de datos. Esto es útil por si necesitas restaurar un usuario más tarde o hacer un seguimiento.


## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
