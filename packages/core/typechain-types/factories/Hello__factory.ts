/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Hello, HelloInterface } from "../Hello";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "MessageEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "randomNumber",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct Hello.EventStruct",
        name: "eventStruct",
        type: "tuple",
      },
    ],
    name: "StructEvent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_message",
        type: "string",
      },
    ],
    name: "message",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x000200000000000200030000000000020001000000010355000000000301001900000060033002700000009f0030019d0000009f033001970000000102200190000001070000c13d000000040230008c000001660000413d000000000101043b000000a401100197000000a50110009c000001660000c13d0000000001000416000000000101004b000001660000c13d0000000001000031000000040210008a000000a003000041000000200420008c00000000040000190000000004034019000000a002200197000000000502004b000000000300a019000000a00220009c00000000020400190000000002036019000000000202004b000001660000c13d00000001030003670000000402300370000000000202043b000000a10420009c000001660000213d0000002304200039000000a005000041000000000614004b00000000060000190000000006058019000000a001100197000000a004400197000000000714004b0000000005008019000000000114013f000000a00110009c00000000010600190000000001056019000000000101004b000001660000c13d0000000401200039000000000113034f000000000101043b000000a10310009c0000014f0000213d0000001f03100039000000200500008a000000000353016f000000bf03300039000000000353016f000000a604300041000000a70440009c0000014f0000413d000300000005001d000000400030043f000000800010043f000000240320003900000000023100190000000004000031000000000242004b000001660000213d0000001f0210018f00000001033003670000000504100272000000560000613d00000000050000190000000506500210000000000763034f000000000707043b000000a00660003900000000007604350000000105500039000000000645004b0000004e0000413d000000000502004b000000650000613d0000000504400210000000000343034f0000000302200210000000a004400039000000000504043300000000052501cf000000000525022f000000000303043b0000010002200089000000000323022f00000000022301cf000000000252019f0000000000240435000000a0011000390000000000010435000000a80100004100000000001004390000009f0100004100000000020004140000009f0320009c0000000001024019000000c001100210000000a9011001c70000800b02000039027702720000040f0000000102200190000001660000613d000000000101043b000200000001001d000000a80100004100000000001004390000009f0100004100000000020004140000009f0320009c0000000001024019000000c001100210000000a9011001c70000800b02000039027702720000040f0000000102200190000001660000613d000000020200002900000064232000c9000000000101043b000000000201004b00000000020000190000008b0000613d00000000211300d9000000640110008c00000000020000190000000102006039000200000002001d000100000003001d000000a80100004100000000001004390000009f0100004100000000020004140000009f0320009c0000000001024019000000c001100210000000a9011001c70000800b02000039027702720000040f0000000102200190000001660000613d000000000101043b000000000101004b000000000100001900000001010060390000000202000029000000000112019f0000000101100190000001710000613d000000400100043d0000002002000039000200000002001d0000000003210436000000800200043d00000000002304350000004003100039000000000402004b000000b20000613d00000000040000190000000005340019000000a006400039000000000606043300000000006504350000002004400039000000000524004b000000ab0000413d000000000332001900000000000304350000005f022000390000000303000029000000000232016f0000009f030000410000009f0410009c000000000103801900000040011002100000009f0420009c00000000020380190000006002200210000000000112019f00000000020004140000009f0420009c0000000002038019000000c002200210000000000112019f000000ac011001c70000800d020000390000000103000039000000ad040000410277026d0000040f0000000101200190000001660000613d000000400300043d000000ae0130009c0000014f0000213d0000004001300039000000400010043f00000020023000390000000101000029000000000012043500000080010000390000000000130435000000400100043d000000020400002900000000054104360000000004030433000000400300003900000000003504350000006005100039000000000304043300000000003504350000008005100039000000000603004b000000e90000613d000000000600001900000000075600190000002006600039000000000846001900000000080804330000000000870435000000000736004b000000e20000413d000000000453001900000000000404350000000002020433000000400410003900000000002404350000009f023000390000000303000029000000000232016f0000009f030000410000009f0410009c000000000103801900000040011002100000009f0420009c00000000020380190000006002200210000000000112019f00000000020004140000009f0420009c0000000002038019000000c002200210000000000112019f000000ac011001c70000800d020000390000000103000039000000af040000410277026d0000040f0000000101200190000001660000613d0000000001000019000002780001042e0000008001000039000000400010043f0000000001000416000000000101004b000001660000c13d00000000020000310000009f03200039000000200100008a000000000313016f000000400030043f0000001f0320018f000000010400036700000005052002720000011e0000613d00000000060000190000000507600210000000000874034f000000000808043b000000800770003900000000008704350000000106600039000000000756004b000001160000413d000000000603004b0000012d0000613d0000000505500210000000000454034f00000003033002100000008005500039000000000605043300000000063601cf000000000636022f000000000404043b0000010003300089000000000434022f00000000033401cf000000000363019f0000000000350435000000a003000041000000200420008c00000000040000190000000004034019000000a005200197000000000605004b000000000300a019000000a00550009c000000000304c019000000000303004b000001660000c13d000000800400043d000000a10340009c000001660000213d00000080052000390000009f02400039000000a003000041000000000652004b00000000060000190000000006038019000000a007500197000000a002200197000000000872004b0000000003008019000000000272013f000000a00220009c00000000020600190000000002036019000000000202004b000001660000c13d00000080024000390000000003020433000000a20230009c000001550000413d000000aa0100004100000000001004350000004101000039000000040010043f000000ab0100004100000279000104300000003f02300039000000000112016f000000400700043d0000000001170019000000000271004b00000000020000190000000102004039000000a10610009c0000014f0000213d00000001022001900000014f0000c13d000000400010043f0000000002370436000000a0014000390000000004130019000000000454004b000001680000a13d00000000010000190000027900010430000300000007001d027701770000040f0000000301000029027701840000040f000000200100003900000100001004430000012000000443000000a301000041000002780001042e000000aa0100004100000000001004350000001101000039000000040010043f000000ab010000410000027900010430000000000403004b000001810000613d000000000400001900000000052400190000000006140019000000000606043300000000006504350000002004400039000000000534004b0000017a0000413d00000000012300190000000000010435000000000001042d0005000000000002000000400800043d0000002002800039000000b003000041000000000032043500000024038000390000002004000039000300000004001d00000000004304350000000003010433000000440480003900000000003404350000006404800039000000000503004b0000019b0000613d000000000500001900000000064500190000002005500039000000000715001900000000070704330000000000760435000000000635004b000001940000413d000000000443001900000000000404350000001f03300039000000200500008a000000000353016f000000440430003900000000004804350000008303300039000400000005001d000000000453016f0000000003840019000000000443004b00000000040000190000000104004039000000a10530009c000002610000213d0000000104400190000002610000c13d000500000001001d000000400030043f0000009f04000041000200000004001d0000009f0320009c0000000002048019000000400220021000000000010804330000009f0310009c00000000010480190000006001100210000000000121019f00000000020004140000009f0320009c0000000002048019000000c002200210000000000121019f000000b102000041027702720000040f000000a801000041000000000010043900000000010004140000009f0210009c00000002020000290000000001028019000000c001100210000000a9011001c70000800b02000039027702720000040f00000001022001900000025f0000613d000000000101043b000200000001001d000000a80100004100000000001004390000009f0100004100000000020004140000009f0320009c0000000001024019000000c001100210000000a9011001c70000800b02000039027702720000040f00000001022001900000025f0000613d000000020200002900000064232000c9000000000101043b000000000201004b0000000002000019000001e40000613d00000000211300d9000000640110008c00000000020000190000000102006039000200000002001d000100000003001d000000a80100004100000000001004390000009f0100004100000000020004140000009f0320009c0000000001024019000000c001100210000000a9011001c70000800b02000039027702720000040f00000001022001900000025f0000613d000000000101043b000000000101004b000000000100001900000001010060390000000202000029000000000112019f00000001011001900000000507000029000002670000613d000000400100043d00000003020000290000000003210436000000000207043300000000002304350000004003100039000000000402004b0000020b0000613d000000000400001900000000053400190000002004400039000000000674001900000000060604330000000000650435000000000524004b000002040000413d000000000332001900000000000304350000005f022000390000000403000029000000000232016f0000009f030000410000009f0410009c000000000103801900000040011002100000009f0420009c00000000020380190000006002200210000000000112019f00000000020004140000009f0420009c0000000002038019000000c002200210000000000112019f000000ac011001c70000800d020000390000000103000039000000ad040000410277026d0000040f00000001012001900000025f0000613d000000400300043d000000ae0130009c0000000504000029000002610000213d0000004001300039000000400010043f0000002002300039000000010100002900000000001204350000000000430435000000400100043d000000030400002900000000054104360000000004030433000000400300003900000000003504350000006005100039000000000304043300000000003504350000008005100039000000000603004b000002420000613d000000000600001900000000075600190000002006600039000000000846001900000000080804330000000000870435000000000736004b0000023b0000413d000000000453001900000000000404350000000002020433000000400410003900000000002404350000009f023000390000000403000029000000000232016f0000009f030000410000009f0410009c000000000103801900000040011002100000009f0420009c00000000020380190000006002200210000000000112019f00000000020004140000009f0420009c0000000002038019000000c002200210000000000112019f000000ac011001c70000800d020000390000000103000039000000af040000410277026d0000040f00000001012001900000025f0000613d000000000001042d00000000010000190000027900010430000000aa0100004100000000001004350000004101000039000000040010043f000000ab010000410000027900010430000000aa0100004100000000001004350000001101000039000000040010043f000000ab01000041000002790001043000000270002104210000000102000039000000000001042d0000000002000019000000000001042d00000275002104230000000102000039000000000001042d0000000002000019000000000001042d0000027700000432000002780001042e00000279000104300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffff8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffff00000000000000000000000000000000000000000000000100000000000000000000000200000000000000000000000000000040000001000000000000000000ffffffff0000000000000000000000000000000000000000000000000000000005c766d100000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000ffffffffffffffffffffffffffffffffffffffffffffffff0000000000000080796b89b91644bc98cd93958e4c9038275d622183e25ac5af08cc6b5d9553913202000002000000000000000000000000000000040000000000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000002000000000000000000000000000000000000000000000000000000000000007ba22a0cbd3226111d8a61812ff4cd1934aace2147b8c59de1ecc9975f7af218000000000000000000000000000000000000000000000000ffffffffffffffbf159fec0bb2fd4779a18791ece9f4644d57aebf190b6aef145eb075ba448ec4e641304fac00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000636f6e736f6c652e6c6f6728f6fc3de1d5cfbbbdafc3ae4806ed68ed9217d29192cdd648f42546f29fac75";

type HelloConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HelloConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Hello__factory extends ContractFactory {
  constructor(...args: HelloConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _message: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Hello> {
    return super.deploy(_message, overrides || {}) as Promise<Hello>;
  }
  override getDeployTransaction(
    _message: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_message, overrides || {});
  }
  override attach(address: string): Hello {
    return super.attach(address) as Hello;
  }
  override connect(signer: Signer): Hello__factory {
    return super.connect(signer) as Hello__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HelloInterface {
    return new utils.Interface(_abi) as HelloInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Hello {
    return new Contract(address, _abi, signerOrProvider) as Hello;
  }
}
