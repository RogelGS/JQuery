$("document").ready(() => {
	getTable();
});

var continentes = ["AMERICA", "ASIA", "EUROPA", "OCEANIA", "AFRICA"];

const buscar = () => {
	var buscar = $("#buscar").val();

	if(buscar == "") {
		getTable();
	} else {
		var json = {"nombre": buscar};

		$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIPAIS/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;
			var data = res.filter(item => item.nombre.includes(buscar));

				for(var i = 0; i < data.length; i++) {
					tabla += 	'<tr>' +
									'<td>' + data[i].id + '</td>' +
									'<td>' + data[i].nombre + '</td>' +
									'<td>' +  continentes[data[i].continente -1]+ '</td>' +
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
		url: "http:localhost:7500/APIPAIS/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' +  continentes[res[i].continente -1]+ '</td>' +
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
	var nombre = $("#NOMBREG").val();
	var continente = $("#CONTINENTEG").val();

	if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(continente == "") {
		alert("FALTA CONTINENTE");
	} else {
		var json = {"nombre": nombre, "continente": continente};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIPAIS/GUARDAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				$("#modalGuardar").modal("hide");
				clear();
				$(".alert-success").html("Se guardo el PAIS con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7500/APIPAIS/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#IDE").val(id);
			$("#NOMBREE").val(res.nombre);
			$("#CONTINENTEE").val(res.continente);

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
	var continente = $("#CONTINENTEE").val();
	
	if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(continente == "") {
		alert("FALTA CONTINENTE");
	} else {
		var json = {"id": id, "nombre": nombre, "continente": continente};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIPAIS/EDITAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {

				$("#modalEditar").modal("hide");
				clear();
				$(".alert-success").html("Se edito el PAIS con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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

	var jsonPais = {"pais": {"id": id}};

	$.ajax({
		type: "AJAX",
		method: "POST",
		data: JSON.stringify(jsonPais),
		url: "http:localhost:7500/APIGALLETA/BUSCARPAIS",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			if(res.length !== 0) {
				alert("Este PAIS no se puede eliminar debido a que ya se encuentra en uso por una GALLETA");
			} else {
				var json = {"id": id};
				$.ajax({
					type: "AJAX",
					method: "POST",
					data: JSON.stringify(json),
					url: "http:localhost:7500/APIPAIS/BUSCAR",
					contentType: "application/json; charset=UTF-8",
					success: (res) => {
						$("#modalEliminar").modal("show");

						var info = "";
						info += 	'<div class="box-body">' +
              							'<dl class="dl-horizontal">' +
                							'<dt>ID de la PAIS:</dt>' +
                							'<dd id="IDEL">' + id + '</dd>' +
                							'<dt>NOMBRE de la PAIS:</dt>' +
                							'<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                							'<dt>CONTINENTE del PAIS:</dd>' +
                							'<dd>' + continentes[res.continente-1] + '</dt>' +
              							'</dl>' +
            						'</div>';

            $("#info").html(info);
            getTable();
		},
		error: (err) => {
			console.log(err);
		}
	});
			}
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
		url: "http:localhost:7500/APIPAIS/ELIMINAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#modalEliminar").modal("hide");
			$(".alert-success").html("Se elimino el PAIS con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
	$("#CONTINENTEG").val("");
}