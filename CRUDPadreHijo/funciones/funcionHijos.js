$("document").ready(() => {
	getTable();
	fillPadre();
});


const buscar = () => {
	var buscar = $("#search").val();

	if(buscar == "") {
		getTable();
	}
	
	var json = {"app": buscar};
	$.ajax({
		type: "AJAX",
		method: "POST",
		data: JSON.stringify(json),
		url: "http:localhost:7001/APIHIJO/BUSCARAPP",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + res[i].app + '</td>' +
								'<td>' + res[i].apm + '</td>' +
								'<td>' + res[i].hobby + '</td>' +
								'<td>' + res[i].padre.nombre + '</td>' +
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

const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7001/APIHIJO/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + res[i].app + '</td>' +
								'<td>' + res[i].apm + '</td>' +
								'<td>' + res[i].hobby + '</td>' +
								'<td>' + res[i].padre.nombre + '</td>' +
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

const fillPadre = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7001/APIPADRE/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var opcion = '<option value="">Seleccione un PADRE</option>';

			for(var i = 0; i < res.length; i++) {
				opcion += 	'<option value="' + res[i].id + '">' + res[i].nombre + ' ' + res[i].app + ' ' + res[i].apm + '</option>'
			}
			$("#PADREG").html(opcion);
			$("#PADREE").html(opcion);
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
	var app = $("#APPG").val();
	var apm = $("#APMG").val();
	var hobby = $("#HOBBYG").val();
	var padre = $("#PADREG").val();

	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(app == "") {
		alert("FALTA APP");
	} else if(apm == "") {
		alert("FALTA APM");
	} else if(hobby == "") {
		alert("FALTA HOBBY");
	} else if(padre == "") {
		alert("FALTA PADRE");
	} else {
		var json = {"id": id, "nombre": nombre, "app": app, "apm": apm, "hobby": hobby, padre: {"id": padre}};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7001/APIHIJO/GUARDAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				$("#modalGuardar").modal("hide");
				clear();
				$(".alert-success").html("Se guardo el HIJO con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7001/APIHIJO/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#IDE").val(id);
			$("#NOMBREE").val(res.nombre);
			$("#APPE").val(res.app);
			$("#APME").val(res.apm);
			$("#HOBBYE").val(res.hobby);
			$("#PADREE").val(res.padre.id);

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
	var app = $("#APPE").val();
	var apm = $("#APME").val();
	var hobby = $("#HOBBYE").val();
	var padre = $("#PADREE").val();
	
	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(app == "") {
		alert("FALTA APP");
	} else if(apm == "") {
		alert("FALTA APM");
	} else if(hobby == "") {
		alert("FALTA HOBBY");
	} else if(padre == "") {
		alert("FALTA PADRE");
	} else {
		var json = {"id": id, "nombre": nombre, "app": app, "apm": apm, "hobby": hobby, padre: {"id": padre}};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7001/APIHIJO/EDITAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {

				$("#modalEditar").modal("hide");
				clear();
				$(".alert-success").html("Se edito el HIJO con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7001/APIHIJO/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("show");

			var info = "";
			info += 	'<div class="box-body">' +
              				'<dl class="dl-horizontal">' +
                				'<dt>ID del HIJO:</dt>' +
                				'<dd id="IDEL">' + id + '</dd>' +
                				'<dt>NOMBRE del HIJO:</dt>' +
                				'<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                				'<dt>APP del HIJO:</dt>' +
                				'<dd>' + res.app + '</dd>' +
                				'<dt>APM del HIJO:</dt>' +
                				'<dd>' + res.apm + '</dd>' +
                				'<dt>HOBBY del HIJO:</dt>' +
                				'<dd>' + res.hobby + '</dd>' +
                				'<dt>PADRE del HIJO:</dt>' +
                				'<dd>' + res.padre.nombre + ' ' + res.padre.app + ' ' + res.padre.apm + '</dd>' +
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
		url: "http:localhost:7001/APIHIJO/ELIMINAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$(".alert-success").html("Se elimino el HIJO con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
	$("#APPG").val("");
	$("#APMG").val("");
	$("#HOBBYG").val("");
	$("#PADREG").val("");
}