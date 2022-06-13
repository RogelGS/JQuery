
// CARGAR TABLA
$("document").ready(() => {
	getTable();
});

// OBTENER TABLA
const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/PELICULAAPI/listar",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla +=	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + res[i].genero + '</td>' +
								'<td>' + res[i].duracion + '</td>' +
								'<td><a class="btn btn-danger" data="'+res[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
		          				'<td><a class="btn btn-warning" data="'+res[i].id+'"><i class="fa fa-fw fa-refresh"></i></a></td>'+
							'</tr>'
			}
			$('#tabla').html(tabla);
		},
		error: (err) => {
			console.log(err);
		}
	});
}


// BOTON GUARDAR QUE ABRE EL MODAL GUARDAR
$("#btnModalGuardar").click(() => {
	$("#modalGuardar").modal("show");
});

// BOTON PARA GUARDAR LA PELICULA
$("#btnGuardar").click(() => {
	var id = $("#IDG").val();
	var nombre = $("#NOMBREG").val();
	var genero = $("#GENEROG").val();
	var duracion = $("#DURACIONG").val();

	if(id == '') {
		alert("Falta ID");
	} else if(nombre == '') {
		alert("Falta NOMBRE");
	} else if(genero == '') {
		alert("Falta GENERO");
	} else if(duracion == '') {
		alert("Falta DURACIÓN");
	} else {
		var json = {"id": id, "nombre": nombre, "genero": genero, "duracion": duracion};

		$.ajax({
			type: "AJAX",
			method: "POST",
			url: "http:localhost:7500/PELICULAAPI/guardar",
			data: JSON.stringify(json),
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				
				$("#modalGuardar").modal("hide");
				clear();
				$('.alert-success').html('Se guardo la PELICULA con el NOMBRE ' + nombre).fadeIn().delay(4000).fadeOut('snow');
				getTable();
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
});

// BOTON EDITAR QUE ABRE EL MODAL EDITAR
$("#tabla").on("click", ".btn-warning", function() {
	var id = $(this).attr('data');

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/PELICULAAPI/buscar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			
			$('#IDE').val(id);
			$('#NOMBREE').val(res.nombre);
			$('#GENEROE').val(res.genero);
			$('#DURACIONE').val(res.duracion);

			$("#modalEditar").modal("show");
		},
		error: (err) => {
			console.log(err);
		}
	});
});

// BOTON EDITAR
$("#btnEditar").click(() => {
	var id = $("#IDE").val();
	var nombre = $("#NOMBREE").val();
	var genero = $("#GENEROE").val();
	var duracion = $("#DURACIONE").val();

	if(id == '') {
		alert("Falta ID");
	} else if(nombre == '') {
		alert("Falta NOMBRE");
	} else if(genero == '') {
		alert("Falta GENERO");
	} else if(duracion == '') {
		alert("Falta DURACIÓN");
	} else {
		var json = {"id": id, "nombre": nombre, "genero": genero, "duracion": duracion};

		$.ajax({
			type: "AJAX",
			method: "POST",
			url: "http:localhost:7500/PELICULAAPI/editar",
			data: JSON.stringify(json),
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				
				$("#modalEditar").modal("hide");
				clear();
				$('.alert-warning').html('Se guardo la PELICULA con el NOMBRE ' + nombre).fadeIn().delay(4000).fadeOut('snow');
				getTable();
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
});


// BOTON ELIMINAR QUE ABRE EL MODAL ELIMINAR
$("#tabla").on("click", ".btn-danger", function() {
	var id = $(this).attr('data');

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/PELICULAAPI/buscar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("show");
			
			var info = "";
			info +=	'<div class="box-body">' +
              '<dl class="dl-horizontal">' +
                '<dt>ID de la PELICULA:</dt>' +
                '<dd id="IDEL">' + id + '</dd>' +
                '<dt>NOMBRE de la PELICULA:</dt>' +
                '<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                '<dt>GENERO de la PELICULA:</dd>' +
                '<dd id="GENEROEL">' + res.genero + '</dt>' +
                '<dt>DURACION de la PELICULA</dd>' +
                '<dd id="DURACIONEL">' + res.duracion + '</dt>' +
              '</dl>' +
            '</div>';

            $("#info").html(info);
			getTable();
		},
		error: (err) => {
			console.log(err);
		}
	});
});


// BOTON ELIMINAR
$("#btnEliminar").click(() => {
	var id = $("#IDEL").html();
	var nombre = $("#NOMBREEL").html();

	console.log(nombre);
	var json = {"id" : id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		url: "http:localhost:7500/PELICULAAPI/eliminar",
		data: JSON.stringify(json),
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$('.alert-danger').html('Se elimino el registro con el nombre ' + nombre).fadeIn().delay(4000).fadeOut('snow')
			getTable();
		},
		error: (err) => {
			console.log(err);
		}
	});
});

const clear = () => {
	$('#IDG').val('');
	$('#NOMBREG').val('');
	$('#GENEROG').val('');
	$('#DURACIONG').val('');
}