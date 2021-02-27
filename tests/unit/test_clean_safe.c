/*
 * DO NOT EDIT THIS FILE. Generated by checkmk.
 * Edit the original source file "test_clean_safe.ts" instead.
 */

#include <check.h>

#line 1 "test_clean_safe.ts"
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

#include "../../src/builtin_table.h"
#include "../../src/clean_string.h"
#include "../../src/detox_struct.h"

#include "unit_struct.h"

#define DATA_COUNT 35
static struct test_filename data[DATA_COUNT] = {
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
};

START_TEST(test_clean_safe)
{
#line 60
    struct clean_string_options *options;
    char *output;
    int i;

    options = new_clean_string_options();
    options->translation_table = load_builtin_safe_table();

    // legacy tests
    for (i = 0; i < DATA_COUNT; i++) {
        output = clean_safe(data[i].filename, options);
        ck_assert_str_eq(output, data[i].expected_a);
    }

}
END_TEST

START_TEST(test_clean_safe_missing_options)
{
#line 74
    clean_safe("what", NULL);
}
END_TEST

int main(void)
{
    Suite *s1 = suite_create("Core");
    TCase *tc1_1 = tcase_create("Core");
    SRunner *sr = srunner_create(s1);
    int nf;

    suite_add_tcase(s1, tc1_1);
    tcase_add_test(tc1_1, test_clean_safe);
    tcase_add_exit_test(tc1_1, test_clean_safe_missing_options, 1);

    srunner_run_all(sr, CK_ENV);
    nf = srunner_ntests_failed(sr);
    srunner_free(sr);

    return nf == 0 ? 0 : 1;
}
