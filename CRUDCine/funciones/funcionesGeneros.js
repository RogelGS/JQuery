$("document").ready(() => {
	getTable();
});

const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIGENERO/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + (res[i].estatus == 1 ? 'ACTIVO' : 'INACTIVO') + '</td>' +
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

$("#btnModalGuardar").click(() => {
	$("#modalGuardar").modal("show");
});

$("#btnGuardar").click(() => {
	var id = $("#IDG").val();
	var nombre = $("#NOMBREG").val();
	var estado = $("#ESTADOG").val();

	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(estado == "") {
		alert("FALTA ESTADO");
	} else {
		var json = {"id": id, "nombre": nombre, "estatus": estado};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIGENERO/GUARDAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				$("#modalGuardar").modal("hide");
				clear();
				$(".alert-success").html("Se guardo el GENERO con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7500/APIGENERO/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#IDE").val(id);
			$("#NOMBREE").val(res.nombre);
			$("#ESTADOE").val(res.estatus);

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
	var estado = $("#ESTADOE").val();
	console.log(estado);
	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(estado == "") {
		alert("FALTA ESTADO");
	} else {
		var json = {"id": id, "nombre": nombre, "estatus": estado};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIGENERO/EDITAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {

				$("#modalEditar").modal("hide");
				clear();
				$(".alert-success").html("Se edito el GENERO con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7500/APIGENERO/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("show");

			var info = "";
			info += 	'<div class="box-body">' +
              				'<dl class="dl-horizontal">' +
                				'<dt>ID del GENERO:</dt>' +
                				'<dd id="IDEL">' + id + '</dd>' +
                				'<dt>NOMBRE del GENERO:</dt>' +
                				'<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                				'<dt>ESTADO del GENERO:</dd>' +
                				'<dd>' + (res.estatus == 1 ? 'ACTIVO': 'INACTIVO') + '</dt>' +
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
		url: "http:localhost:7500/APIGENERO/ELIMINAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$(".alert-success").html("Se elimino el GENERO con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
	$("#ESTADOG").val("");
}