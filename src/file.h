/**
 * This file is part of the Detox package.
 *
 * Copyright (c) Doug Harple <detox.dharple@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

#ifndef __FILE_H
#define __FILE_H

#include "detox.h"

extern char *parse_file(char *filename, struct detox_options *options);

extern void parse_dir(char *indir, struct detox_options *options);

extern void parse_special(char *in, struct detox_options *options);

extern void parse_inline(char *filename, struct detox_options *options);

#endif /* __FILE_H */
