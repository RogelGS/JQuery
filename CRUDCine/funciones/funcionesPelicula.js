$("document").ready(() => {
	getTable();
	fillGenero();
	fillClasificacion();
});

const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIPELICULA/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + res[i].precio + '</td>' +
								'<td>' + res[i].fecha_estreno + '</td>' +
								'<td>' + res[i].duracion + '</td>' +
								'<td>' + (res[i].idioma == 1 ? 'ESPAÑOL' : res[i].idioma == 2 ? 'INGLES' : res[i].idioma == 3 ? 'JAPONES' : res[i].idioma == 4 ? 'KOREANO' : 'FRANCES') + '</td>' +
								'<td>' + res[i].genero.nombre + '</td>' +
								'<td>' + res[i].clasificacion.nombre + '</td>' +
								'<td><a class="btn btn-danger" data="'+res[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
		          				'<td><a class="btn btn-warning" data="'+res[i].id+'"><i class="fa fa-fw fa-refresh"></i></a></td>'+
							'</tr>';
			}
			$("#tabla").html(tabla);
		},
		error: (err) => {
			console.log(err);
		}
	});
}

const fillGenero = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIGENERO/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var opcion = '<option value="">Seleccione un GENERO</option>';

			for(var i = 0; i < res.length; i++) {
				opcion += '<option value="'+ res[i].id +'">' + res[i].nombre + '</option>';
			}
			$("#GENEROG").html(opcion);
			$("#GENEROE").html(opcion);
		},
		error: (err) => {
			console.log(err);
		}
	});
}

const fillClasificacion = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APICLASIFICACION/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var opcion = '<option value="">Seleccione una CLASIFICACION</option>';

			for(var i = 0; i < res.length; i++) {
				opcion += '<option value="'+ res[i].id +'">' + res[i].nombre + '</option>';
			}
			$("#CLASIFICACIONG").html(opcion);
			$("#CLASIFICACIONE").html(opcion);
		},
		error: (err) => {
			console.log(err);
		}
	});
}

$("#btnModalGuardar").click(() => {
	$("#modalGuardar").modal("show");
});

$("#btnGuardar").click(() => {
	var id = $("#IDG").val();
	var nombre = $("#NOMBREG").val();
	var precio = $("#PRECIOG").val();
	var fecha = moment($("#FECHAG").val()).format('DD-MM-YYYY');
	var duracion = $("#DURACIONG").val();
	var idioma = $("#IDIOMAG").val();
	var genero = $("#GENEROG").val();
	var clasificacion = $("#CLASIFICACIONG").val();

	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(precio == "") {
		alert("FALTA PRECIO");
	} else if(fecha == "") {
		alert("FALTA FECHA DE ESTRENO");
	} else if(duracion == "") {
		alert("FALTA DURACION");
	} else if(idioma == "") {
		alert("FALTA IDIOMA");
	} else if(genero == "") {
		alert("FALTA GENERO");
	} else if(clasificacion == "") {
		alert("FALTA CLASIFICACION");
	} else {
		var json = {"id": id, "nombre": nombre, "precio": precio, "fecha_estreno": fecha, "duracion": duracion, "idioma": idioma, "genero": {"id": genero}, clasificacion: {"id": clasificacion}};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIPELICULA/GUARDAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				$("#modalGuardar").modal("hide");
				clear();
				$(".alert-success").html("Se guardo la PELICULA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
				getTable();
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
});

$("#tabla").on("click", ".btn-warning", function() {
	var id = $(this).attr("data");

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		data: JSON.stringify(json),
		url: "http:localhost:7500/APIPELICULA/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#IDE").val(id);
			$("#NOMBREE").val(res.nombre);
			$("#PRECIOE").val(res.precio);
			$("#FECHAE").val(res.fecha_estreno);
			$("#DURACIONE").val(res.duracion);
			$("#IDIOMAE").val(res.idioma);
			$("#GENEROE").val(res.genero.id);
			$("#CLASIFICACIONE").val(res.clasificacion.id);

			$("#modalEditar").modal("show");
		},
		error: (err) => {
			console.log(err);
		}
	});
});

$("#btnEditar").click(() => {
	var id = $("#IDE").val();
	var nombre = $("#NOMBREE").val();
	var precio = $("#PRECIOE").val();
	var fecha = moment($("#FECHAE").val()).format('DD-MM-YYYY');
	var duracion = $("#DURACIONE").val();
	var idioma = $("#IDIOMAE").val();
	var genero = $("#GENEROE").val();
	var clasificacion = $("#CLASIFICACIONE").val();

	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(precio == "") {
		alert("FALTA PRECIO");
	} else if(fecha == "") {
		alert("FALTA FECHA DE ESTRENO");
	} else if(duracion == "") {
		alert("FALTA DURACION");
	} else if(idioma == "") {
		alert("FALTA IDIOMA");
	} else if(genero == "") {
		alert("FALTA GENERO");
	} else if(clasificacion == "") {
		alert("FALTA CLASIFICACION");
	} else {
		var json = {"id": id, "nombre": nombre, "precio": precio, "fecha_estreno": fecha, "duracion": duracion, "idioma": idioma, "genero": {"id": genero}, clasificacion: {"id": clasificacion}};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIPELICULA/EDITAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {

				$("#modalEditar").modal("hide");
				clear();
				$(".alert-success").html("Se edito la PELICULA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
				getTable();
			},
			error: (err) => {
				console.log(err);
			}
		});
	}
});

$("#tabla").on("click", ".btn-danger", function() {
	var id = $(this).attr("data");

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		data: JSON.stringify(json),
		url: "http:localhost:7500/APIPELICULA/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("show");

			var info = "";
			info += 	'<div class="box-body">' +
              				'<dl class="dl-horizontal">' +
                				'<dt>ID de la PELUCULA:</dt>' +
                				'<dd id="IDEL">' + id + '</dd>' +
                				'<dt>NOMBRE de la PELUCULA:</dt>' +
                				'<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                				'<dt>PRECIO de la PELUCULA:</dd>' +
                				'<dd>' + res.precio + '</dt>' +
                				'<dt>FECHA ESTRENO de la PELUCULA:</dd>' +
                				'<dd>' + res.fecha_estreno + '</dt>' +
                				'<dt>DURACION de la PELUCULA:</dd>' +
                				'<dd>' + res.duracion + '</dt>' +
                				'<dt>IDIOMA de la PELUCULA:</dd>' +
                				'<dd>' + (res.idioma == 1 ? 'ESPAÑOL' : res.idioma == 2 ? 'INGLES' : res.idioma == 3 ? 'JAPONES' : res.idioma == 4 ? 'KOREANO' : 'FRANCES') + '</dt>' +
                				'<dt>GENERO de la PELUCULA:</dd>' +
                				'<dd>' + res.genero.nombre + '</dt>' +
                				'<dt>CLASIFICACION de la PELUCULA:</dd>' +
                				'<dd>' + res.clasificacion.nombre + '</dt>' +
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

$("#btnEliminar").click(() => {
	var id = $("#IDEL").html();
	var nombre = $("#NOMBREEL").html();

	var json = {"id": id};

	$.ajax({
		type: "AJAX",
		method: "POST",
		data: JSON.stringify(json),
		url: "http:localhost:7500/APIPELICULA/ELIMINAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$(".alert-success").html("Se elimino la PELICULA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
			getTable();
		},
		error: (err) => {
			console.log(err);
		}
	});
});

const clear = () => {
	$("#IDG").val("");
	$("#NOMBREG").val("");
	$("#PRECIOG").val("");
	$("#FECHAG").val("");
	$("#DURACIONG").val("");
	$("#IDIOMAG").val("");
	$("#GENEROG").val("");
	$("#CLASIFICACIONG").val("");
}