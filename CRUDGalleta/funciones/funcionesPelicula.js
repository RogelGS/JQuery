$("document").ready(() => {
	getTable();
	fillMarca();
	fillPais();
});

const buscar = () => {
	var buscar = $("#buscar").val();

	if(buscar == "") {
		getTable();
	} else {
		var json = {"nombre": buscar};

		$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIGALLETA/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			var data = res.filter(item => item.nombre.includes(buscar));

			for(var i = 0; i < data.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + data[i].id + '</td>' +
								'<td>' + data[i].nombre + '</td>' +
								'<td>' + data[i].marca.nombre + '</td>' +
								'<td>' + data[i].precio + '</td>' +
								'<td>' + data[i].conte_neto + '</td>' +
								'<td>' + data[i].sabor + '</td>' +
								'<td>' + data[i].pais.nombre + '</td>' +	
								'<td><a class="btn btn-danger" data="'+data[i].id+'"><i class="fa fa-fw fa-remove"></i></a></td>'+
		          				'<td><a class="btn btn-warning" data="'+data[i].id+'"><i class="fa fa-fw fa-refresh"></i></a></td>'+
							'</tr>';
			}
			$("#tabla").html(tabla);
		},
		error: (err) => {
			console.log(err);
		}
	});
	}
}

const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIGALLETA/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + res[i].marca.nombre + '</td>' +
								'<td>' + res[i].precio + '</td>' +
								'<td>' + res[i].conte_neto + '</td>' +
								'<td>' + res[i].sabor + '</td>' +
								'<td>' + res[i].pais.nombre + '</td>' +	
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

const fillMarca = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIMARCA/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var opcion = '<option value="">Seleccione una MARCA</option>';

			for(var i = 0; i < res.length; i++) {
				opcion += '<option value="'+ res[i].id +'">' + res[i].nombre + '</option>';
			}
			$("#MARCAG").html(opcion);
			$("#MARCAE").html(opcion);
		},
		error: (err) => {
			console.log(err);
		}
	});
}

const fillPais = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIPAIS/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var opcion = '<option value="">Seleccione un PAIS</option>';

			for(var i = 0; i < res.length; i++) {
				opcion += '<option value="'+ res[i].id +'">' + res[i].nombre + '</option>';
			}
			$("#PAISG").html(opcion);
			$("#PAISE").html(opcion);
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
	var nombre = $("#NOMBREG").val();
	var marca = $("#MARCAG").val();
	var precio = $("#PRECIOG").val();
	var cont = $("#CONTG").val();
	var sabor = $("#SABORG").val();
	var pais = $("#PAISG").val();

	if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(marca == "") {
		alert("FALTA MARCA");
	} else if(precio == "") {
		alert("FALTA PRECIO");
	} else if(cont == "") {
		alert("FALTA CONTENIDO NETO");
	} else if(sabor == "") {
		alert("FALTA SABOR");
	} else if(pais == "") {
		alert("FALTA PAIS");
	} else {
		var json = {"nombre": nombre, "marca": {"id": marca}, "precio": precio, "conte_neto": cont, "sabor": sabor, "pais": {"id": pais}};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIGALLETA/GUARDAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				$("#modalGuardar").modal("hide");
				clear();
				$(".alert-success").html("Se guardo la GALLETA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7500/APIGALLETA/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#IDE").val(id);
			$("#NOMBREE").val(res.nombre);
			$("#MARCAE").val(res.marca.id);
			$("#PRECIOE").val(res.precio);
			$("#CONTE").val(res.conte_neto);
			$("#SABORE").val(res.sabor);
			$("#PAISE").val(res.pais.id);

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
	var marca = $("#MARCAE").val();
	var precio = $("#PRECIOE").val();
	var cont = $("#CONTE").val();
	var sabor = $("#SABORE").val();
	var pais = $("#PAISE").val();

	if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(marca == "") {
		alert("FALTA MARCA");
	} else if(precio == "") {
		alert("FALTA PRECIO");
	} else if(cont == "") {
		alert("FALTA CONTENIDO NETO");
	} else if(sabor == "") {
		alert("FALTA SABOR");
	} else if(pais == "") {
		alert("FALTA PAIS");
	} else {
		var json = {"id": id, "nombre": nombre, "marca": {"id": marca}, "precio": precio, "conte_neto": cont, "sabor": sabor, "pais": {"id": pais}};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIGALLETA/EDITAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {

				$("#modalEditar").modal("hide");
				clear();
				$(".alert-success").html("Se edito la GALLETA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7500/APIGALLETA/BUSCAR",
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
                				'<dd>' + res.marca.id + '</dt>' +
                				'<dt>FECHA ESTRENO de la PELUCULA:</dd>' +
                				'<dd>' + res.precio + '</dt>' +
                				'<dt>DURACION de la PELUCULA:</dd>' +
                				'<dd>' + res.conte_neto + '</dt>' +
                				'<dt>IDIOMA de la PELUCULA:</dd>' +
                				'<dd>' + res.sabor + '</dt>' +
                				'<dt>GENERO de la PELUCULA:</dd>' +
                				'<dd>' + res.pais.nombre + '</dt>' +
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
		url: "http:localhost:7500/APIGALLETA/ELIMINAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$(".alert-success").html("Se elimino la GALLETA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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