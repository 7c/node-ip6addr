var test = require('tape').test;
///--- Globals

const parse = require('../ip6addr.js').parse;

///--- Tests

test('toBigInt should be equal to toLong if ipv4', function (t) {
  t.equal(parseInt(parse('0.0.0.0').toBigInt()), parse('0.0.0.0').toLong(), 'toBigInt should be equal to toLong');
  t.equal(parseInt(parse('255.255.255.255').toBigInt()), parse('255.255.255.255').toLong(), 'toBigInt should be equal to toLong');
  t.end();
})

test('toBigInt should have type bigint and should support all ipv4 and ipv6', function (t) {
  t.equal(typeof parse('0.0.0.0').toBigInt(), 'bigint', 'toBigInt should be of type bigint');
  t.equal(typeof parse('255.255.255.255').toBigInt(), 'bigint', 'toBigInt should be of type bigint');
  t.equal(typeof parse('::1').toBigInt(), 'bigint', 'Value should be of type bigint');
  t.equal(typeof parse('2001:db8:85a3::8a2e:370:7334').toBigInt(), 'bigint', 'Value should be of type bigint');
  t.end();
})

test('toBigInt should work as predefined values', function (t) {
  t.equal(parse('0.0.0.0').toBigInt(), BigInt(0), '0.0.0.0 should convert to BigInt 0');
  t.equal(parse('255.255.255.255').toBigInt(), BigInt(4294967295), '255.255.255.255 should convert to BigInt 4294967295');
  t.equal(parse('::1').toBigInt(), 1n, '::1 should convert to BigInt 1');
  t.equal(parse('2001:db8:85a3:0::8a2e:370:7334').toBigInt(), 42540766452641154071740215577757643572n, '2001:db8:85a3::8a2e:370:7334 should convert to BigInt 42540766452641154071740215577757643572');
  t.equal(parse('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff').toBigInt(), 340282366920938463463374607431768211455n, 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff should convert to BigInt 340282366920938463463374607431768211455');
  t.equal(parse('ffff::ffff').toBigInt(), 340277174624079928635746076935439056895n, 'ffff::ffff should convert to BigInt 340277174624079928635746076935439056895');
  t.equal(parse('ffff:0:0::ffff').toBigInt(), 340277174624079928635746076935439056895n, 'ffff:0:0::ffff should convert to BigInt 340277174624079928635746076935439056895');
  t.end();
})

test('parse with BigInt should work', function (t) {
  t.equal(parse(1n).toString(), '0.0.0.1'); // ipv4 is supported
  t.equal(parse(340277174624079928635746076935439056895n).toString(), 'ffff::ffff'); // we get short form
  t.equal(parse(340277174624079928635746076935439056895n).toBigInt(), 340277174624079928635746076935439056895n, 'we get the same value back');
  t.equal(parse(42540766452641154071740215577757643572n).toString(), '2001:db8:85a3::8a2e:370:7334');
  t.end();
})
