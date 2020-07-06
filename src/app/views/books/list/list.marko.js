// Compiled using marko@4.21.9 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/node$1.0.0/src/app/views/books/list/list.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_forOf = require("marko/src/runtime/helpers/for-of"),
    helpers_escape_xml = require("marko/src/runtime/html/helpers/escape-xml"),
    marko_escapeXml = helpers_escape_xml.x,
    marko_attr = require("marko/src/runtime/html/helpers/attr"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer")),
    _preferred_script_location_tag = marko_loadTag(require("marko/src/core-tags/components/preferred-script-location-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><link rel=stylesheet href=/static/css/bootstrap.min.css><link rel=stylesheet href=/static/css/fontawesome.min.css><link rel=stylesheet href=/static/css/casadocodigo.css></head><body><header class=cabecalhoPrincipal><div class=container><div class=\"row align-items-center\"><div class=col-4><h1 class=logo><img src=/static/imagens/logo-casadocodigo.svg alt=\"Casa do Código\"></h1></div><div class=\"cabecalhoPrincipal-navegacao col-8\"><a href=/livros/form class=login><strong>Cadastrar livro</strong></a><a href=/logout class=login><i class=\"fas fa-sign-out-alt\"></i>Logout</a></div></div></div></header><main class=conteudoPrincipal><div class=container><h1>Listagem de livros</h1><table" +
    marko_attr("id", "books") +
    " class=\"table table-striped table-hover\"><thead class=thead-dark><tr><th>ID</th><th>Título</th><th>Preço</th><th>Editar</th><th>Remover</th></tr></thead> <tbody>");

  var $for$0 = 0;

  marko_forOf(data.books, function(book) {
    var $keyScope$0 = "[" + (($for$0++) + "]");

    out.w("<tr" +
      marko_attr("id", "book_" + book.id) +
      "><td>" +
      marko_escapeXml(book.id) +
      "</td><td>" +
      marko_escapeXml(book.titulo) +
      "</td><td>R$ " +
      marko_escapeXml(book.preco) +
      "</td><td><a" +
      marko_attr("href", "/livros/form/" + book.id) +
      ">Editar</a></td><td><a" +
      marko_attr("href", "#") +
      marko_attr("data-ref", "" + book.id) +
      marko_attr("data-type", "remove") +
      ">Remover</a></td></tr>");
  });

  out.w("</tbody></table></div></main><footer class=rodape><div class=container><div class=\"row align-items-center\"><div class=col-4><img src=/static/imagens/logo-rodape.svg class=logo-rodape></div><div class=col-8><ul class=redesSociais><li><a href=http://www.facebook.com/casadocodigo class=compartilhar-facebook target=_blank>/CasaDoCodigo</a></li><li><a href=http://www.twitter.com/casadocodigo class=compartilhar-twitter target=_blank>@casadocodigo</a></li></ul></div></div></div></footer><script src=/static/js/remove-book.js></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "48");

  _preferred_script_location_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/node$1.0.0/src/app/views/books/list/list.marko",
    tags: [
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer",
      "marko/src/core-tags/components/preferred-script-location-tag"
    ]
  };
