# final-pwi
Proyecto final - Inventario informatico

Para mi proyecto realicé un sistema que permita registrar modelos de equipos con algunos de sus detalles basicos.
El recorrido por la app inicia en HOME, donde un mensaje de bienvenida le espera.
A continuacion puede navegar por la app con los botones de la barra de navegación lateral.
Ingresandando en "Agregar modelo" puede acceder a 3 nuevas opciones de carga: CPU, Notebook o Monitor.
Segun el dispositivo que quiera cargar, el formulario varía para que pueda completar solo los campos permitidos para ese tipo de dispositivo.
Esto fue posible utilizando el condicional if de HBS y los Partials.
Una vez ingresado el modelo, se puede ir a la pagina de "listado" donde, en una tabla dinamica, se veran todos los datos cargados provenientes de la BD.
Ademas, en el listado se cuenta con dos botones: el verde para editar y el rojo para eliminar.
Ambos botones disparan un ventana modal que en el caso de la edicion, contiene un formulario que precarga los atributos del registro a modificar y, en el caso del de eliminación, simplemente carga la advertencia.

Muchas gracias por leer este Readme.
Quedo a disposicion por cualquier consulta que surja.
Saludos,
Lautaro