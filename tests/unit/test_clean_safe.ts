/**
 * This file is part of the Detox package.
 *
 * Copyright (c) Doug Harple <detox.dharple@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "builtin_table.h"
#include "clean_string.h"
#include "detox_struct.h"
#include "table.h"

#include "unit_struct.h"

#define DATA_COUNT 46
static struct test_filename data[DATA_COUNT] = {

    // legacy tests

    { .filename = "lower",                      .expected_a = "lower" },
    { .filename = "^acute",                     .expected_a = "^acute" },
    { .filename = "&ampersand",                 .expected_a = "_and_ampersand" },
    { .filename = "<angle bracket left",        .expected_a = "_angle_bracket_left" },
    { .filename = ">angle bracket right",       .expected_a = "_angle_bracket_right" },
    { .filename = "\\back slash",               .expected_a = "_back_slash" },
    { .filename = "`back tick",                 .expected_a = "_back_tick" },
    { .filename = "|bar",                       .expected_a = "_bar" },
    { .filename = "{brace left",                .expected_a = "-brace_left" },
    { .filename = "}brace right",               .expected_a = "-brace_right" },
    { .filename = ":colon",                     .expected_a = "_colon" },
    { .filename = ",comma",                     .expected_a = ",comma" },
    { .filename = "@commercial at",             .expected_a = "_commercial_at" },
    { .filename = "dash-",                      .expected_a = "dash-" },
    { .filename = "#dash_octothorpe-",          .expected_a = "#dash_octothorpe-" },
    { .filename = "_dash_underscore-",          .expected_a = "_dash_underscore-" },
    { .filename = "$dollar sign",               .expected_a = "_dollar_sign" },
    { .filename = "\"double quote",             .expected_a = "_double_quote" },
    { .filename = "ends with octothorpe#",      .expected_a = "ends_with_octothorpe#" },
    { .filename = "!exclamation point",         .expected_a = "_exclamation_point" },
    { .filename = "#octothorpe",                .expected_a = "#octothorpe" },
    { .filename = "#-octothorpe_dash",          .expected_a = "#-octothorpe_dash" },
    { .filename = "(parenthesis left",          .expected_a = "-parenthesis_left" },
    { .filename = ")parenthesis right",         .expected_a = "-parenthesis_right" },
    { .filename = "%percent",                   .expected_a = "%percent" },
    { .filename = "+plus",                      .expected_a = "+plus" },
    { .filename = "?question mark",             .expected_a = "_question_mark" },
    { .filename = ";semi colon",                .expected_a = "_semi_colon" },
    { .filename = "'single quote",              .expected_a = "_single_quote" },
    { .filename = " space",                     .expected_a = "_space" },
    { .filename = "[square bracket left",       .expected_a = "-square_bracket_left" },
    { .filename = "]square bracket right",      .expected_a = "-square_bracket_right" },
    { .filename = "_-underscore_dash",          .expected_a = "_-underscore_dash" },
    { .filename = "_underscore",                .expected_a = "_underscore" },
    { .filename = "~tilde",                     .expected_a = "~tilde" },

    // other

    { .filename = "\u00C6 capital AE",          .expected_a = "\u00C6_capital_AE" },
    { .filename = "\xC6 capital AE",            .expected_a = "\xC6_capital_AE" },
    { .filename = "\u00DE capital thorn",       .expected_a = "\u00DE_capital_thorn" },
    { .filename = "\xDE capital thorn",         .expected_a = "\xDE_capital_thorn" },
    { .filename = "\u0172 capital U Ogonek",    .expected_a = "\u0172_capital_U_Ogonek" },
    { .filename = "\x7E tilde",                 .expected_a = "~_tilde" },
    { .filename = "\x7F delete",                .expected_a = "__delete" },

    // github issue 9

    {
        .filename   = "hi\tthere",
        .expected_a = "hi_there",
        .expected_b = "hi_tab_there",
    },

    // github issue 17

    {
        .filename   = "new\nline",
        .expected_a = "new_line",
        .expected_b = "new_nl_line",
    },

    // other, with a/b rules

    {
        .filename   = "\x07 bell",
        .expected_a = "__bell",
        .expected_b = "_beep__bell",
    },
    {
        .filename   = "\x09 tab \x0A new line",
        .expected_a = "__tab___new_line",
        .expected_b = "_tab__tab__nl__new_line",
    },
};

#test test_clean_safe
    table_t *table;
    char *output;
    int i;

    table = load_builtin_safe_table();

    for (i = 0; i < DATA_COUNT; i++) {
        output = clean_safe(data[i].filename, table);
        ck_assert_str_eq(output, data[i].expected_a);
    }

#test test_clean_safe_null
    char *output;

    // confirm NULL works
    output = clean_safe(NULL, NULL);
    ck_assert(output == NULL);

#test-exit(1) test_clean_safe_missing_table
    clean_safe("what", NULL);

#test test_clean_safe_custom
    table_t *table;
    char *output;
    int i;

    table = load_builtin_safe_table();

    table_put(table, 0x07, "_beep_");
    table_put(table, 0x09, "_tab_");
    table_put(table, 0x0a, "_nl_");

    // legacy tests
    for (i = 0; i < DATA_COUNT; i++) {
        output = clean_safe(data[i].filename, table);
        ck_assert_str_eq(output, (data[i].expected_b != NULL) ? data[i].expected_b : data[i].expected_a);
    }
