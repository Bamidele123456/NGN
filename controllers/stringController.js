
const { analyzeString } = require("../utils/analyzer.js");
const { stringsDB } = require("../models/stringModel.js");


exports.createString = (req, res) => {
  const { value } = req.body;

  if (typeof value === "undefined") {
    return res.status(400).json({ error: "Missing 'value' field" });
  }

  if (typeof value !== "string") {
    return res.status(422).json({ error: "'value' must be a string" });
  }

  const properties = analyzeString(value);

  if (stringsDB.has(properties.sha256_hash)) {
    return res.status(409).json({ error: "String already exists" });
  }

  const newString = {
    id: properties.sha256_hash,
    value,
    properties,
    created_at: new Date().toISOString(),
  };

  stringsDB.set(properties.sha256_hash, newString);
  res.status(201).json(newString);
};

exports.getString = (req, res) => {
  const { string_value } = req.params;
  const hash = [...stringsDB.values()].find((item) => item.value === string_value);

  if (!hash) return res.status(404).json({ error: "String not found" });

  res.status(200).json(hash);
};

exports.getAllStrings = (req, res) => {
  let data = [...stringsDB.values()];

  const { is_palindrome, min_length, max_length, word_count, contains_character } = req.query;

  // Filters
  if (is_palindrome !== undefined)
    data = data.filter((i) => i.properties.is_palindrome === (is_palindrome === "true"));

  if (min_length) data = data.filter((i) => i.properties.length >= parseInt(min_length));
  if (max_length) data = data.filter((i) => i.properties.length <= parseInt(max_length));
  if (word_count) data = data.filter((i) => i.properties.word_count === parseInt(word_count));
  if (contains_character)
    data = data.filter((i) => i.value.includes(contains_character));

  const filters_applied = Object.fromEntries(Object.entries(req.query).filter(([_, v]) => v));

  res.status(200).json({
    data,
    count: data.length,
    filters_applied,
  });
};

exports.deleteString = (req, res) => {
  const { string_value } = req.params;
  const entry = [...stringsDB.entries()].find(([_, v]) => v.value === string_value);
  if (!entry) return res.status(404).json({ error: "String not found" });

  stringsDB.delete(entry[0]);
  res.status(204).send();
};

exports.filterByNaturalLanguage = (req, res) => {
  const query = (req.query.query || "").toLowerCase();
  const results = [];

  for (const [key, value] of stringsDB.entries()) {
    if (value.value.toLowerCase().includes(query)) {
      results.push(value);
    }
  }

  res.status(200).json({ results });
};

