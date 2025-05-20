## Features
- Verificación de roles/permiso: En métodos de actualización o eliminación, podrías agregar una verificación para asegurar que el usuario que realiza la acción tenga los permisos adecuados. Si tu sistema tiene roles, sería una buena idea verificar que el usuario que intenta realizar la acción es el propietario del recurso o tiene un rol adecuado (administrador, por ejemplo).

- Soft delete (eliminación suave): En lugar de eliminar usuarios permanentemente, podrías optar por una "eliminación suave" (soft delete), donde solo marcas a los usuarios como eliminados, pero sigues guardando sus datos en la base de datos. Esto es útil por si necesitas restaurar un usuario más tarde o hacer un seguimiento.

✅ Implementados

    - Diseño de entidades robusto: Clientes, productos, ventas, pagos — todo conectado lógicamente. ✔️

    - Relaciones consistentes y funcionales entre ventas y pagos, con manejo correcto de saldos. ✔️

    - Importación masiva desde Excel con validación por fila, manejo de enums y estructura compleja ✔️

    - Uso de enums inteligentes (payment_day combina días de semana, días del mes y frecuencias). ✔️

    - Lógica de rutas dinámicas para visitas, configurable por tipo de frecuencia — ya lista para producción. ✔️

    - Servicios reutilizables y DTOs limpios, buena arquitectura. ✔️

    - Validaciones de negocio implementadas en cada servicio crítico (registerSale, registerPayment, etc.). ✔️ 
    - Autenticación/autorización: si tu backend se va a abrir, agregar JWT, Roles, o al menos una capa básica. ✔️

    - Endpoints probados manualmente y funcionales, lo cual es fundamental antes de automatizar pruebas. ✔️

🟡 Listo para demo beta, puntos de evolución:

    - Automatizar pruebas (unitarias/integración) sería el siguiente paso para robustecer el backend.

    - Monitoreo y logging: agregar logs útiles o herramientas tipo Sentry, para exponer esto a usuarios reales.

    - Panel frontend o admin para facilitar pruebas o visualizar los datos (lo que ya estás considerando con filtros de rutas).

    - Tal vez preparar un seed de datos o script de precarga para mostrar un flujo completo en demo sin necesidad de Excel.


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
