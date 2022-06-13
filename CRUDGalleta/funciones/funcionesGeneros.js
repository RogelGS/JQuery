$("document").ready(() => {
	getTable();
});

const buscar = () => {
	var buscar = $("#buscar").val();
	console.log(buscar);
	if(buscar == "") {
		getTable();
	} else {
		var json = {"nombre": buscar};

		$.ajax({
		type: "AJAX",
		method: "GET",
		url: "http:localhost:7500/APIMARCA/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;
			var data = res.filter(item => item.nombre.includes(buscar));

				for(var i = 0; i < data.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + data[i].id + '</td>' +
								'<td>' + data[i].nombre + '</td>' +
								'<td>' + data[i].slogan + '</td>' +
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
		url: "http:localhost:7500/APIMARCA/LISTAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			var tabla;

			for(var i = 0; i < res.length; i++) {
				tabla += 	'<tr>' +
								'<td>' + res[i].id + '</td>' +
								'<td>' + res[i].nombre + '</td>' +
								'<td>' + res[i].slogan + '</td>' +
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
	var slogan = $("#ESLOGANG").val();

	if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(eslogan == "") {
		alert("FALTA ESLOGAN");
	} else {
		var json = {"nombre": nombre, "slogan": slogan};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIMARCA/GUARDAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {
				$("#modalGuardar").modal("hide");
				clear();
				$(".alert-success").html("Se guardo e la MARCA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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
		url: "http:localhost:7500/APIMARCA/BUSCAR",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			$("#IDE").val(id);
			$("#NOMBREE").val(res.nombre);
			$("#ESLOGANE").val(res.slogan);

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
	var slogan = $("#ESLOGANE").val();
	
	if(nombre == "") {
		alert("FALTA NOMBRE");
	} else if(slogan == "") {
		alert("FALTA ESLOGAN");
	} else {
		var json = {"id": id, "nombre": nombre, "slogan": slogan};

		$.ajax({
			type: "AJAX",
			method: "POST",
			data: JSON.stringify(json),
			url: "http:localhost:7500/APIMARCA/EDITAR",
			contentType: "application/json; charset=UTF-8",
			success: (res) => {

				$("#modalEditar").modal("hide");
				clear();
				$(".alert-success").html("Se edito la MARCA con el nombre " + nombre).fadeIn().delay(4000).fadeOut("snow");
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

	var jsonMarca = {"marca": {"id": id}};

	$.ajax({
		type: "AJAX",
		method: "POST",
		data: JSON.stringify(jsonMarca),
		url: "http:localhost:7500/APIGALLETA/BUSCARMARCA",
		contentType: "application/json; charset=UTF-8",
		success: (res) => {
			console.log(res);			
			if(res.length !== 0) {
				alert("No se puede eliminar la MARCA debido a que ya esta siendo usada por una GALLETA");
			} else {
				var json = {"id": id};
				$.ajax({
					type: "AJAX",
					method: "POST",
					data: JSON.stringify(json),
					url: "http:localhost:7500/APIMARCA/BUSCAR",
					contentType: "application/json; charset=UTF-8",
					success: (res) => {
						$("#modalEliminar").modal("show");

						var info = "";
						info += 	'<div class="box-body">' +
              							'<dl class="dl-horizontal">' +
                							'<dt>ID de la MARCA:</dt>' +
                							'<dd id="IDEL">' + id + '</dd>' +
                							'<dt>NOMBRE de la MARCA:</dt>' +
                							'<dd id="NOMBREEL">' + res.nombre + '</dd>' +
                							'<dt>ESLOGAN de la MARCA:</dd>' +
                							'<dd>' + res.slogan + '</dt>' +
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
		url: "http:localhost:7500/APIMARCA/ELIMINAR",
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
	$("#NOMBREG").val("");
	$("#ESLOGANG").val("");
}