$("document").ready(() => {
	getTable();
});

const getTable = () => {
	$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7001/APIPADRE/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + res[i].app + '</td>' +
								'<td>' + res[i].apm + '</td>' +
								'<td>' + moment(res[i].fecha_nac).format("YYYY-MM-DD") + '</td>' +
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
	var app = $("#APMG").val();
	var apm = $("#APMG").val();
	var fecha_nac = moment($("#FECHAG").val()).format("YYYY-MM-DD");

	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(app == "") {
		alert("FALTA APP");
	}else if(apm == "") {
		alert("FALTA APM");
	}else if(fecha_nac == "") {
		alert("FALTA FECHA");
	} else {
		var json = {"id": id, "nombre": nombre, "app": app, "apm": apm, "fecha_nac": fecha_nac};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7001/APIPADRE/GUARDAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				$("#modalGuardar").modal("hide");
				clear();
				$(".alert-success").html("Se guardo el PADRE con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7001/APIPADRE/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#IDE").val(id);
			$("#NOMBREE").val(res.nombre);
			$("#APPE").val(res.app);
			$("#APME").val(res.apm);
			$("#FECHAE").val(moment(res.fecha_nac).format("YYYY-MM-DD"));

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
	var fecha_nac = moment($("#FECHAE").val()).format("YYYY-MM-DD");
	
	if(id == "") {
		alert("FALTA ID");
	} else if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(app == "") {
		alert("FALTA APP");
	}else if(apm == "") {
		alert("FALTA APM");
	}else if(fecha_nac == "") {
		alert("FALTA FECHA");
	} else {
		var json = {"id": id, "nombre": nombre, "app": app, "apm": apm, "fecha_nac": fecha_nac};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7001/APIPADRE/EDITAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {

				$("#modalEditar").modal("hide");
				clear();
				$(".alert-success").html("Se edito el PADRE con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7001/APIPADRE/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("show");

			var info = "";
			info += 	'<div class="box-body">' +
              				'<dl class="dl-horizontal">' +
                				'<dt>ID del PADRE:</dt>' +
                				'<dd id="IDEL">' + id + '</dd>' +
                				'<dt>NOMBRE del PADRE:</dt>' +
                				'<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                				'<dt>APP del PADRE:</dt>' +
                				'<dd>' + res.app + '</dd>' +
                				'<dt>APM del PADRE:</dt>' +
                				'<dd>' + res.apm + '</dd>' +
                				'<dt>FECHA NACIMIENTO del PADRE:</dt>' +
                				'<dd>' + moment(res.fecha_nac).format("YYYY-MM-DD") + '</dd>' +
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
		url: "http:localhost:7001/APIPADRE/ELIMINAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$(".alert-success").html("Se elimino el PADRE con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
	$("#FECHAG").val("");
}