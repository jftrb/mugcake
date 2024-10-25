import { parseCapitalJSON } from "@/libraries/mugcakeApi"

describe("Testing JSON parser for fields with uppercase first letter", () => {
  test("Uppercase Fields", async () => {
    const json = '{"A": 1, "SubField": "Here"}'
    const recipe = parseCapitalJSON(json)
    expect(recipe.a).toEqual(1)
    expect(recipe.subField).toEqual("Here")
  })
  test("Uppercase SubFields", async () => {
    const json = '{"Fields": {"A": 1, "SubField": "Here"}}'
    const recipe = parseCapitalJSON(json)
    expect(recipe.fields.a).toEqual(1)
    expect(recipe.fields.subField).toEqual("Here")
  })
})