
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model CP
 * 
 */
export type CP = $Result.DefaultSelection<Prisma.$CPPayload>
/**
 * Model TP
 * 
 */
export type TP = $Result.DefaultSelection<Prisma.$TPPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Assessment
 * 
 */
export type Assessment = $Result.DefaultSelection<Prisma.$AssessmentPayload>
/**
 * Model Tahfidz
 * 
 */
export type Tahfidz = $Result.DefaultSelection<Prisma.$TahfidzPayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model ClassRoom
 * 
 */
export type ClassRoom = $Result.DefaultSelection<Prisma.$ClassRoomPayload>
/**
 * Model Assignment
 * 
 */
export type Assignment = $Result.DefaultSelection<Prisma.$AssignmentPayload>
/**
 * Model ScoreRecord
 * 
 */
export type ScoreRecord = $Result.DefaultSelection<Prisma.$ScoreRecordPayload>
/**
 * Model Personality
 * 
 */
export type Personality = $Result.DefaultSelection<Prisma.$PersonalityPayload>
/**
 * Model HomeroomNote
 * 
 */
export type HomeroomNote = $Result.DefaultSelection<Prisma.$HomeroomNotePayload>
/**
 * Model SystemSetting
 * 
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Teachers
 * const teachers = await prisma.teacher.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Teachers
   * const teachers = await prisma.teacher.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cP`: Exposes CRUD operations for the **CP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CPS
    * const cPS = await prisma.cP.findMany()
    * ```
    */
  get cP(): Prisma.CPDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tP`: Exposes CRUD operations for the **TP** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TPS
    * const tPS = await prisma.tP.findMany()
    * ```
    */
  get tP(): Prisma.TPDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessment`: Exposes CRUD operations for the **Assessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assessments
    * const assessments = await prisma.assessment.findMany()
    * ```
    */
  get assessment(): Prisma.AssessmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tahfidz`: Exposes CRUD operations for the **Tahfidz** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tahfidzs
    * const tahfidzs = await prisma.tahfidz.findMany()
    * ```
    */
  get tahfidz(): Prisma.TahfidzDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.classRoom`: Exposes CRUD operations for the **ClassRoom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClassRooms
    * const classRooms = await prisma.classRoom.findMany()
    * ```
    */
  get classRoom(): Prisma.ClassRoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assignment`: Exposes CRUD operations for the **Assignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assignments
    * const assignments = await prisma.assignment.findMany()
    * ```
    */
  get assignment(): Prisma.AssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scoreRecord`: Exposes CRUD operations for the **ScoreRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScoreRecords
    * const scoreRecords = await prisma.scoreRecord.findMany()
    * ```
    */
  get scoreRecord(): Prisma.ScoreRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.personality`: Exposes CRUD operations for the **Personality** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Personalities
    * const personalities = await prisma.personality.findMany()
    * ```
    */
  get personality(): Prisma.PersonalityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.homeroomNote`: Exposes CRUD operations for the **HomeroomNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HomeroomNotes
    * const homeroomNotes = await prisma.homeroomNote.findMany()
    * ```
    */
  get homeroomNote(): Prisma.HomeroomNoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSetting.findMany()
    * ```
    */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Teacher: 'Teacher',
    Subject: 'Subject',
    CP: 'CP',
    TP: 'TP',
    Student: 'Student',
    Assessment: 'Assessment',
    Tahfidz: 'Tahfidz',
    Attendance: 'Attendance',
    ClassRoom: 'ClassRoom',
    Assignment: 'Assignment',
    ScoreRecord: 'ScoreRecord',
    Personality: 'Personality',
    HomeroomNote: 'HomeroomNote',
    SystemSetting: 'SystemSetting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "teacher" | "subject" | "cP" | "tP" | "student" | "assessment" | "tahfidz" | "attendance" | "classRoom" | "assignment" | "scoreRecord" | "personality" | "homeroomNote" | "systemSetting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      CP: {
        payload: Prisma.$CPPayload<ExtArgs>
        fields: Prisma.CPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>
          }
          findFirst: {
            args: Prisma.CPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>
          }
          findMany: {
            args: Prisma.CPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>[]
          }
          create: {
            args: Prisma.CPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>
          }
          createMany: {
            args: Prisma.CPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CPCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>[]
          }
          delete: {
            args: Prisma.CPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>
          }
          update: {
            args: Prisma.CPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>
          }
          deleteMany: {
            args: Prisma.CPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CPUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>[]
          }
          upsert: {
            args: Prisma.CPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CPPayload>
          }
          aggregate: {
            args: Prisma.CPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCP>
          }
          groupBy: {
            args: Prisma.CPGroupByArgs<ExtArgs>
            result: $Utils.Optional<CPGroupByOutputType>[]
          }
          count: {
            args: Prisma.CPCountArgs<ExtArgs>
            result: $Utils.Optional<CPCountAggregateOutputType> | number
          }
        }
      }
      TP: {
        payload: Prisma.$TPPayload<ExtArgs>
        fields: Prisma.TPFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TPFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TPFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>
          }
          findFirst: {
            args: Prisma.TPFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TPFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>
          }
          findMany: {
            args: Prisma.TPFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>[]
          }
          create: {
            args: Prisma.TPCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>
          }
          createMany: {
            args: Prisma.TPCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TPCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>[]
          }
          delete: {
            args: Prisma.TPDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>
          }
          update: {
            args: Prisma.TPUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>
          }
          deleteMany: {
            args: Prisma.TPDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TPUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TPUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>[]
          }
          upsert: {
            args: Prisma.TPUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TPPayload>
          }
          aggregate: {
            args: Prisma.TPAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTP>
          }
          groupBy: {
            args: Prisma.TPGroupByArgs<ExtArgs>
            result: $Utils.Optional<TPGroupByOutputType>[]
          }
          count: {
            args: Prisma.TPCountArgs<ExtArgs>
            result: $Utils.Optional<TPCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Assessment: {
        payload: Prisma.$AssessmentPayload<ExtArgs>
        fields: Prisma.AssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findFirst: {
            args: Prisma.AssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findMany: {
            args: Prisma.AssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          create: {
            args: Prisma.AssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          createMany: {
            args: Prisma.AssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          delete: {
            args: Prisma.AssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          update: {
            args: Prisma.AssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          aggregate: {
            args: Prisma.AssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessment>
          }
          groupBy: {
            args: Prisma.AssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentCountAggregateOutputType> | number
          }
        }
      }
      Tahfidz: {
        payload: Prisma.$TahfidzPayload<ExtArgs>
        fields: Prisma.TahfidzFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TahfidzFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TahfidzFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>
          }
          findFirst: {
            args: Prisma.TahfidzFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TahfidzFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>
          }
          findMany: {
            args: Prisma.TahfidzFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>[]
          }
          create: {
            args: Prisma.TahfidzCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>
          }
          createMany: {
            args: Prisma.TahfidzCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TahfidzCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>[]
          }
          delete: {
            args: Prisma.TahfidzDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>
          }
          update: {
            args: Prisma.TahfidzUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>
          }
          deleteMany: {
            args: Prisma.TahfidzDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TahfidzUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TahfidzUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>[]
          }
          upsert: {
            args: Prisma.TahfidzUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahfidzPayload>
          }
          aggregate: {
            args: Prisma.TahfidzAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTahfidz>
          }
          groupBy: {
            args: Prisma.TahfidzGroupByArgs<ExtArgs>
            result: $Utils.Optional<TahfidzGroupByOutputType>[]
          }
          count: {
            args: Prisma.TahfidzCountArgs<ExtArgs>
            result: $Utils.Optional<TahfidzCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      ClassRoom: {
        payload: Prisma.$ClassRoomPayload<ExtArgs>
        fields: Prisma.ClassRoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassRoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassRoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          findFirst: {
            args: Prisma.ClassRoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassRoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          findMany: {
            args: Prisma.ClassRoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>[]
          }
          create: {
            args: Prisma.ClassRoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          createMany: {
            args: Prisma.ClassRoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassRoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>[]
          }
          delete: {
            args: Prisma.ClassRoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          update: {
            args: Prisma.ClassRoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          deleteMany: {
            args: Prisma.ClassRoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassRoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassRoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>[]
          }
          upsert: {
            args: Prisma.ClassRoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassRoomPayload>
          }
          aggregate: {
            args: Prisma.ClassRoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassRoom>
          }
          groupBy: {
            args: Prisma.ClassRoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassRoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassRoomCountArgs<ExtArgs>
            result: $Utils.Optional<ClassRoomCountAggregateOutputType> | number
          }
        }
      }
      Assignment: {
        payload: Prisma.$AssignmentPayload<ExtArgs>
        fields: Prisma.AssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findFirst: {
            args: Prisma.AssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          findMany: {
            args: Prisma.AssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          create: {
            args: Prisma.AssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          createMany: {
            args: Prisma.AssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          delete: {
            args: Prisma.AssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          update: {
            args: Prisma.AssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          deleteMany: {
            args: Prisma.AssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>[]
          }
          upsert: {
            args: Prisma.AssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssignmentPayload>
          }
          aggregate: {
            args: Prisma.AssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssignment>
          }
          groupBy: {
            args: Prisma.AssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssignmentCountAggregateOutputType> | number
          }
        }
      }
      ScoreRecord: {
        payload: Prisma.$ScoreRecordPayload<ExtArgs>
        fields: Prisma.ScoreRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScoreRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScoreRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>
          }
          findFirst: {
            args: Prisma.ScoreRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScoreRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>
          }
          findMany: {
            args: Prisma.ScoreRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>[]
          }
          create: {
            args: Prisma.ScoreRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>
          }
          createMany: {
            args: Prisma.ScoreRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScoreRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>[]
          }
          delete: {
            args: Prisma.ScoreRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>
          }
          update: {
            args: Prisma.ScoreRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>
          }
          deleteMany: {
            args: Prisma.ScoreRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScoreRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScoreRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>[]
          }
          upsert: {
            args: Prisma.ScoreRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScoreRecordPayload>
          }
          aggregate: {
            args: Prisma.ScoreRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScoreRecord>
          }
          groupBy: {
            args: Prisma.ScoreRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScoreRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScoreRecordCountArgs<ExtArgs>
            result: $Utils.Optional<ScoreRecordCountAggregateOutputType> | number
          }
        }
      }
      Personality: {
        payload: Prisma.$PersonalityPayload<ExtArgs>
        fields: Prisma.PersonalityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonalityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonalityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>
          }
          findFirst: {
            args: Prisma.PersonalityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonalityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>
          }
          findMany: {
            args: Prisma.PersonalityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>[]
          }
          create: {
            args: Prisma.PersonalityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>
          }
          createMany: {
            args: Prisma.PersonalityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonalityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>[]
          }
          delete: {
            args: Prisma.PersonalityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>
          }
          update: {
            args: Prisma.PersonalityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>
          }
          deleteMany: {
            args: Prisma.PersonalityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonalityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonalityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>[]
          }
          upsert: {
            args: Prisma.PersonalityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonalityPayload>
          }
          aggregate: {
            args: Prisma.PersonalityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePersonality>
          }
          groupBy: {
            args: Prisma.PersonalityGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonalityGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonalityCountArgs<ExtArgs>
            result: $Utils.Optional<PersonalityCountAggregateOutputType> | number
          }
        }
      }
      HomeroomNote: {
        payload: Prisma.$HomeroomNotePayload<ExtArgs>
        fields: Prisma.HomeroomNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HomeroomNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HomeroomNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>
          }
          findFirst: {
            args: Prisma.HomeroomNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HomeroomNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>
          }
          findMany: {
            args: Prisma.HomeroomNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>[]
          }
          create: {
            args: Prisma.HomeroomNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>
          }
          createMany: {
            args: Prisma.HomeroomNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HomeroomNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>[]
          }
          delete: {
            args: Prisma.HomeroomNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>
          }
          update: {
            args: Prisma.HomeroomNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>
          }
          deleteMany: {
            args: Prisma.HomeroomNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HomeroomNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HomeroomNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>[]
          }
          upsert: {
            args: Prisma.HomeroomNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HomeroomNotePayload>
          }
          aggregate: {
            args: Prisma.HomeroomNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHomeroomNote>
          }
          groupBy: {
            args: Prisma.HomeroomNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<HomeroomNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.HomeroomNoteCountArgs<ExtArgs>
            result: $Utils.Optional<HomeroomNoteCountAggregateOutputType> | number
          }
        }
      }
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>
        fields: Prisma.SystemSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          createMany: {
            args: Prisma.SystemSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemSetting>
          }
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    teacher?: TeacherOmit
    subject?: SubjectOmit
    cP?: CPOmit
    tP?: TPOmit
    student?: StudentOmit
    assessment?: AssessmentOmit
    tahfidz?: TahfidzOmit
    attendance?: AttendanceOmit
    classRoom?: ClassRoomOmit
    assignment?: AssignmentOmit
    scoreRecord?: ScoreRecordOmit
    personality?: PersonalityOmit
    homeroomNote?: HomeroomNoteOmit
    systemSetting?: SystemSettingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    assignments: number
    subjects: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | TeacherCountOutputTypeCountAssignmentsArgs
    subjects?: boolean | TeacherCountOutputTypeCountSubjectsArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    assignments: number
    cps: number
    scoreRecords: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | SubjectCountOutputTypeCountAssignmentsArgs
    cps?: boolean | SubjectCountOutputTypeCountCpsArgs
    scoreRecords?: boolean | SubjectCountOutputTypeCountScoreRecordsArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountCpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CPWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountScoreRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScoreRecordWhereInput
  }


  /**
   * Count Type CPCountOutputType
   */

  export type CPCountOutputType = {
    tps: number
  }

  export type CPCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tps?: boolean | CPCountOutputTypeCountTpsArgs
  }

  // Custom InputTypes
  /**
   * CPCountOutputType without action
   */
  export type CPCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CPCountOutputType
     */
    select?: CPCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CPCountOutputType without action
   */
  export type CPCountOutputTypeCountTpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TPWhereInput
  }


  /**
   * Count Type TPCountOutputType
   */

  export type TPCountOutputType = {
    assessments: number
  }

  export type TPCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessments?: boolean | TPCountOutputTypeCountAssessmentsArgs
  }

  // Custom InputTypes
  /**
   * TPCountOutputType without action
   */
  export type TPCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TPCountOutputType
     */
    select?: TPCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TPCountOutputType without action
   */
  export type TPCountOutputTypeCountAssessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    assessments: number
    attendances: number
    scoreRecords: number
    tahfidzs: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessments?: boolean | StudentCountOutputTypeCountAssessmentsArgs
    attendances?: boolean | StudentCountOutputTypeCountAttendancesArgs
    scoreRecords?: boolean | StudentCountOutputTypeCountScoreRecordsArgs
    tahfidzs?: boolean | StudentCountOutputTypeCountTahfidzsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAssessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountScoreRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScoreRecordWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountTahfidzsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TahfidzWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    id: number | null
  }

  export type TeacherSumAggregateOutputType = {
    id: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: number | null
    identity_number: string | null
    password: string | null
    fullname: string | null
    birth_date: string | null
    education: string | null
    address: string | null
    role: string | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: number | null
    identity_number: string | null
    password: string | null
    fullname: string | null
    birth_date: string | null
    education: string | null
    address: string | null
    role: string | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    identity_number: number
    password: number
    fullname: number
    birth_date: number
    education: number
    address: number
    role: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    id?: true
  }

  export type TeacherSumAggregateInputType = {
    id?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    identity_number?: true
    password?: true
    fullname?: true
    birth_date?: true
    education?: true
    address?: true
    role?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    identity_number?: true
    password?: true
    fullname?: true
    birth_date?: true
    education?: true
    address?: true
    role?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    identity_number?: true
    password?: true
    fullname?: true
    birth_date?: true
    education?: true
    address?: true
    role?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: number
    identity_number: string
    password: string
    fullname: string
    birth_date: string | null
    education: string | null
    address: string | null
    role: string
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identity_number?: boolean
    password?: boolean
    fullname?: boolean
    birth_date?: boolean
    education?: boolean
    address?: boolean
    role?: boolean
    assignments?: boolean | Teacher$assignmentsArgs<ExtArgs>
    subjects?: boolean | Teacher$subjectsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identity_number?: boolean
    password?: boolean
    fullname?: boolean
    birth_date?: boolean
    education?: boolean
    address?: boolean
    role?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identity_number?: boolean
    password?: boolean
    fullname?: boolean
    birth_date?: boolean
    education?: boolean
    address?: boolean
    role?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    identity_number?: boolean
    password?: boolean
    fullname?: boolean
    birth_date?: boolean
    education?: boolean
    address?: boolean
    role?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identity_number" | "password" | "fullname" | "birth_date" | "education" | "address" | "role", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | Teacher$assignmentsArgs<ExtArgs>
    subjects?: boolean | Teacher$subjectsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      assignments: Prisma.$AssignmentPayload<ExtArgs>[]
      subjects: Prisma.$SubjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      identity_number: string
      password: string
      fullname: string
      birth_date: string | null
      education: string | null
      address: string | null
      role: string
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends Teacher$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subjects<T extends Teacher$subjectsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$subjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'Int'>
    readonly identity_number: FieldRef<"Teacher", 'String'>
    readonly password: FieldRef<"Teacher", 'String'>
    readonly fullname: FieldRef<"Teacher", 'String'>
    readonly birth_date: FieldRef<"Teacher", 'String'>
    readonly education: FieldRef<"Teacher", 'String'>
    readonly address: FieldRef<"Teacher", 'String'>
    readonly role: FieldRef<"Teacher", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.assignments
   */
  export type Teacher$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    cursor?: AssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Teacher.subjects
   */
  export type Teacher$subjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    cursor?: SubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectAvgAggregateOutputType = {
    id: number | null
    teacherId: number | null
  }

  export type SubjectSumAggregateOutputType = {
    id: number | null
    teacherId: number | null
  }

  export type SubjectMinAggregateOutputType = {
    id: number | null
    name: string | null
    teacherId: number | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: number | null
    name: string | null
    teacherId: number | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    name: number
    teacherId: number
    _all: number
  }


  export type SubjectAvgAggregateInputType = {
    id?: true
    teacherId?: true
  }

  export type SubjectSumAggregateInputType = {
    id?: true
    teacherId?: true
  }

  export type SubjectMinAggregateInputType = {
    id?: true
    name?: true
    teacherId?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    name?: true
    teacherId?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    name?: true
    teacherId?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _avg?: SubjectAvgAggregateInputType
    _sum?: SubjectSumAggregateInputType
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: number
    name: string
    teacherId: number
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    teacherId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    assignments?: boolean | Subject$assignmentsArgs<ExtArgs>
    cps?: boolean | Subject$cpsArgs<ExtArgs>
    scoreRecords?: boolean | Subject$scoreRecordsArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    teacherId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    teacherId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    name?: boolean
    teacherId?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "teacherId", ExtArgs["result"]["subject"]>
  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    assignments?: boolean | Subject$assignmentsArgs<ExtArgs>
    cps?: boolean | Subject$cpsArgs<ExtArgs>
    scoreRecords?: boolean | Subject$scoreRecordsArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
  }

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      assignments: Prisma.$AssignmentPayload<ExtArgs>[]
      cps: Prisma.$CPPayload<ExtArgs>[]
      scoreRecords: Prisma.$ScoreRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      teacherId: number
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignments<T extends Subject$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cps<T extends Subject$cpsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$cpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    scoreRecords<T extends Subject$scoreRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$scoreRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'Int'>
    readonly name: FieldRef<"Subject", 'String'>
    readonly teacherId: FieldRef<"Subject", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject.assignments
   */
  export type Subject$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    cursor?: AssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Subject.cps
   */
  export type Subject$cpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    where?: CPWhereInput
    orderBy?: CPOrderByWithRelationInput | CPOrderByWithRelationInput[]
    cursor?: CPWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CPScalarFieldEnum | CPScalarFieldEnum[]
  }

  /**
   * Subject.scoreRecords
   */
  export type Subject$scoreRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    where?: ScoreRecordWhereInput
    orderBy?: ScoreRecordOrderByWithRelationInput | ScoreRecordOrderByWithRelationInput[]
    cursor?: ScoreRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScoreRecordScalarFieldEnum | ScoreRecordScalarFieldEnum[]
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model CP
   */

  export type AggregateCP = {
    _count: CPCountAggregateOutputType | null
    _avg: CPAvgAggregateOutputType | null
    _sum: CPSumAggregateOutputType | null
    _min: CPMinAggregateOutputType | null
    _max: CPMaxAggregateOutputType | null
  }

  export type CPAvgAggregateOutputType = {
    id: number | null
    subjectId: number | null
  }

  export type CPSumAggregateOutputType = {
    id: number | null
    subjectId: number | null
  }

  export type CPMinAggregateOutputType = {
    id: number | null
    code: string | null
    description: string | null
    subjectId: number | null
  }

  export type CPMaxAggregateOutputType = {
    id: number | null
    code: string | null
    description: string | null
    subjectId: number | null
  }

  export type CPCountAggregateOutputType = {
    id: number
    code: number
    description: number
    subjectId: number
    _all: number
  }


  export type CPAvgAggregateInputType = {
    id?: true
    subjectId?: true
  }

  export type CPSumAggregateInputType = {
    id?: true
    subjectId?: true
  }

  export type CPMinAggregateInputType = {
    id?: true
    code?: true
    description?: true
    subjectId?: true
  }

  export type CPMaxAggregateInputType = {
    id?: true
    code?: true
    description?: true
    subjectId?: true
  }

  export type CPCountAggregateInputType = {
    id?: true
    code?: true
    description?: true
    subjectId?: true
    _all?: true
  }

  export type CPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CP to aggregate.
     */
    where?: CPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CPS to fetch.
     */
    orderBy?: CPOrderByWithRelationInput | CPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CPS
    **/
    _count?: true | CPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CPMaxAggregateInputType
  }

  export type GetCPAggregateType<T extends CPAggregateArgs> = {
        [P in keyof T & keyof AggregateCP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCP[P]>
      : GetScalarType<T[P], AggregateCP[P]>
  }




  export type CPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CPWhereInput
    orderBy?: CPOrderByWithAggregationInput | CPOrderByWithAggregationInput[]
    by: CPScalarFieldEnum[] | CPScalarFieldEnum
    having?: CPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CPCountAggregateInputType | true
    _avg?: CPAvgAggregateInputType
    _sum?: CPSumAggregateInputType
    _min?: CPMinAggregateInputType
    _max?: CPMaxAggregateInputType
  }

  export type CPGroupByOutputType = {
    id: number
    code: string
    description: string
    subjectId: number
    _count: CPCountAggregateOutputType | null
    _avg: CPAvgAggregateOutputType | null
    _sum: CPSumAggregateOutputType | null
    _min: CPMinAggregateOutputType | null
    _max: CPMaxAggregateOutputType | null
  }

  type GetCPGroupByPayload<T extends CPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CPGroupByOutputType[P]>
            : GetScalarType<T[P], CPGroupByOutputType[P]>
        }
      >
    >


  export type CPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    subjectId?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    tps?: boolean | CP$tpsArgs<ExtArgs>
    _count?: boolean | CPCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cP"]>

  export type CPSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    subjectId?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cP"]>

  export type CPSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    subjectId?: boolean
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cP"]>

  export type CPSelectScalar = {
    id?: boolean
    code?: boolean
    description?: boolean
    subjectId?: boolean
  }

  export type CPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "description" | "subjectId", ExtArgs["result"]["cP"]>
  export type CPInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    tps?: boolean | CP$tpsArgs<ExtArgs>
    _count?: boolean | CPCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CPIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type CPIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $CPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CP"
    objects: {
      subject: Prisma.$SubjectPayload<ExtArgs>
      tps: Prisma.$TPPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      description: string
      subjectId: number
    }, ExtArgs["result"]["cP"]>
    composites: {}
  }

  type CPGetPayload<S extends boolean | null | undefined | CPDefaultArgs> = $Result.GetResult<Prisma.$CPPayload, S>

  type CPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CPCountAggregateInputType | true
    }

  export interface CPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CP'], meta: { name: 'CP' } }
    /**
     * Find zero or one CP that matches the filter.
     * @param {CPFindUniqueArgs} args - Arguments to find a CP
     * @example
     * // Get one CP
     * const cP = await prisma.cP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CPFindUniqueArgs>(args: SelectSubset<T, CPFindUniqueArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CPFindUniqueOrThrowArgs} args - Arguments to find a CP
     * @example
     * // Get one CP
     * const cP = await prisma.cP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CPFindUniqueOrThrowArgs>(args: SelectSubset<T, CPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CPFindFirstArgs} args - Arguments to find a CP
     * @example
     * // Get one CP
     * const cP = await prisma.cP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CPFindFirstArgs>(args?: SelectSubset<T, CPFindFirstArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CPFindFirstOrThrowArgs} args - Arguments to find a CP
     * @example
     * // Get one CP
     * const cP = await prisma.cP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CPFindFirstOrThrowArgs>(args?: SelectSubset<T, CPFindFirstOrThrowArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CPS
     * const cPS = await prisma.cP.findMany()
     * 
     * // Get first 10 CPS
     * const cPS = await prisma.cP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cPWithIdOnly = await prisma.cP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CPFindManyArgs>(args?: SelectSubset<T, CPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CP.
     * @param {CPCreateArgs} args - Arguments to create a CP.
     * @example
     * // Create one CP
     * const CP = await prisma.cP.create({
     *   data: {
     *     // ... data to create a CP
     *   }
     * })
     * 
     */
    create<T extends CPCreateArgs>(args: SelectSubset<T, CPCreateArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CPS.
     * @param {CPCreateManyArgs} args - Arguments to create many CPS.
     * @example
     * // Create many CPS
     * const cP = await prisma.cP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CPCreateManyArgs>(args?: SelectSubset<T, CPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CPS and returns the data saved in the database.
     * @param {CPCreateManyAndReturnArgs} args - Arguments to create many CPS.
     * @example
     * // Create many CPS
     * const cP = await prisma.cP.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CPS and only return the `id`
     * const cPWithIdOnly = await prisma.cP.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CPCreateManyAndReturnArgs>(args?: SelectSubset<T, CPCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CP.
     * @param {CPDeleteArgs} args - Arguments to delete one CP.
     * @example
     * // Delete one CP
     * const CP = await prisma.cP.delete({
     *   where: {
     *     // ... filter to delete one CP
     *   }
     * })
     * 
     */
    delete<T extends CPDeleteArgs>(args: SelectSubset<T, CPDeleteArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CP.
     * @param {CPUpdateArgs} args - Arguments to update one CP.
     * @example
     * // Update one CP
     * const cP = await prisma.cP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CPUpdateArgs>(args: SelectSubset<T, CPUpdateArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CPS.
     * @param {CPDeleteManyArgs} args - Arguments to filter CPS to delete.
     * @example
     * // Delete a few CPS
     * const { count } = await prisma.cP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CPDeleteManyArgs>(args?: SelectSubset<T, CPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CPS
     * const cP = await prisma.cP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CPUpdateManyArgs>(args: SelectSubset<T, CPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CPS and returns the data updated in the database.
     * @param {CPUpdateManyAndReturnArgs} args - Arguments to update many CPS.
     * @example
     * // Update many CPS
     * const cP = await prisma.cP.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CPS and only return the `id`
     * const cPWithIdOnly = await prisma.cP.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CPUpdateManyAndReturnArgs>(args: SelectSubset<T, CPUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CP.
     * @param {CPUpsertArgs} args - Arguments to update or create a CP.
     * @example
     * // Update or create a CP
     * const cP = await prisma.cP.upsert({
     *   create: {
     *     // ... data to create a CP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CP we want to update
     *   }
     * })
     */
    upsert<T extends CPUpsertArgs>(args: SelectSubset<T, CPUpsertArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CPCountArgs} args - Arguments to filter CPS to count.
     * @example
     * // Count the number of CPS
     * const count = await prisma.cP.count({
     *   where: {
     *     // ... the filter for the CPS we want to count
     *   }
     * })
    **/
    count<T extends CPCountArgs>(
      args?: Subset<T, CPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CPAggregateArgs>(args: Subset<T, CPAggregateArgs>): Prisma.PrismaPromise<GetCPAggregateType<T>>

    /**
     * Group by CP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CPGroupByArgs['orderBy'] }
        : { orderBy?: CPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CP model
   */
  readonly fields: CPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tps<T extends CP$tpsArgs<ExtArgs> = {}>(args?: Subset<T, CP$tpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CP model
   */
  interface CPFieldRefs {
    readonly id: FieldRef<"CP", 'Int'>
    readonly code: FieldRef<"CP", 'String'>
    readonly description: FieldRef<"CP", 'String'>
    readonly subjectId: FieldRef<"CP", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * CP findUnique
   */
  export type CPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * Filter, which CP to fetch.
     */
    where: CPWhereUniqueInput
  }

  /**
   * CP findUniqueOrThrow
   */
  export type CPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * Filter, which CP to fetch.
     */
    where: CPWhereUniqueInput
  }

  /**
   * CP findFirst
   */
  export type CPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * Filter, which CP to fetch.
     */
    where?: CPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CPS to fetch.
     */
    orderBy?: CPOrderByWithRelationInput | CPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CPS.
     */
    cursor?: CPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CPS.
     */
    distinct?: CPScalarFieldEnum | CPScalarFieldEnum[]
  }

  /**
   * CP findFirstOrThrow
   */
  export type CPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * Filter, which CP to fetch.
     */
    where?: CPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CPS to fetch.
     */
    orderBy?: CPOrderByWithRelationInput | CPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CPS.
     */
    cursor?: CPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CPS.
     */
    distinct?: CPScalarFieldEnum | CPScalarFieldEnum[]
  }

  /**
   * CP findMany
   */
  export type CPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * Filter, which CPS to fetch.
     */
    where?: CPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CPS to fetch.
     */
    orderBy?: CPOrderByWithRelationInput | CPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CPS.
     */
    cursor?: CPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CPS.
     */
    distinct?: CPScalarFieldEnum | CPScalarFieldEnum[]
  }

  /**
   * CP create
   */
  export type CPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * The data needed to create a CP.
     */
    data: XOR<CPCreateInput, CPUncheckedCreateInput>
  }

  /**
   * CP createMany
   */
  export type CPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CPS.
     */
    data: CPCreateManyInput | CPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CP createManyAndReturn
   */
  export type CPCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * The data used to create many CPS.
     */
    data: CPCreateManyInput | CPCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CP update
   */
  export type CPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * The data needed to update a CP.
     */
    data: XOR<CPUpdateInput, CPUncheckedUpdateInput>
    /**
     * Choose, which CP to update.
     */
    where: CPWhereUniqueInput
  }

  /**
   * CP updateMany
   */
  export type CPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CPS.
     */
    data: XOR<CPUpdateManyMutationInput, CPUncheckedUpdateManyInput>
    /**
     * Filter which CPS to update
     */
    where?: CPWhereInput
    /**
     * Limit how many CPS to update.
     */
    limit?: number
  }

  /**
   * CP updateManyAndReturn
   */
  export type CPUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * The data used to update CPS.
     */
    data: XOR<CPUpdateManyMutationInput, CPUncheckedUpdateManyInput>
    /**
     * Filter which CPS to update
     */
    where?: CPWhereInput
    /**
     * Limit how many CPS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CP upsert
   */
  export type CPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * The filter to search for the CP to update in case it exists.
     */
    where: CPWhereUniqueInput
    /**
     * In case the CP found by the `where` argument doesn't exist, create a new CP with this data.
     */
    create: XOR<CPCreateInput, CPUncheckedCreateInput>
    /**
     * In case the CP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CPUpdateInput, CPUncheckedUpdateInput>
  }

  /**
   * CP delete
   */
  export type CPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
    /**
     * Filter which CP to delete.
     */
    where: CPWhereUniqueInput
  }

  /**
   * CP deleteMany
   */
  export type CPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CPS to delete
     */
    where?: CPWhereInput
    /**
     * Limit how many CPS to delete.
     */
    limit?: number
  }

  /**
   * CP.tps
   */
  export type CP$tpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    where?: TPWhereInput
    orderBy?: TPOrderByWithRelationInput | TPOrderByWithRelationInput[]
    cursor?: TPWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TPScalarFieldEnum | TPScalarFieldEnum[]
  }

  /**
   * CP without action
   */
  export type CPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CP
     */
    select?: CPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CP
     */
    omit?: CPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CPInclude<ExtArgs> | null
  }


  /**
   * Model TP
   */

  export type AggregateTP = {
    _count: TPCountAggregateOutputType | null
    _avg: TPAvgAggregateOutputType | null
    _sum: TPSumAggregateOutputType | null
    _min: TPMinAggregateOutputType | null
    _max: TPMaxAggregateOutputType | null
  }

  export type TPAvgAggregateOutputType = {
    id: number | null
    cpId: number | null
  }

  export type TPSumAggregateOutputType = {
    id: number | null
    cpId: number | null
  }

  export type TPMinAggregateOutputType = {
    id: number | null
    code: string | null
    description: string | null
    cpId: number | null
  }

  export type TPMaxAggregateOutputType = {
    id: number | null
    code: string | null
    description: string | null
    cpId: number | null
  }

  export type TPCountAggregateOutputType = {
    id: number
    code: number
    description: number
    cpId: number
    _all: number
  }


  export type TPAvgAggregateInputType = {
    id?: true
    cpId?: true
  }

  export type TPSumAggregateInputType = {
    id?: true
    cpId?: true
  }

  export type TPMinAggregateInputType = {
    id?: true
    code?: true
    description?: true
    cpId?: true
  }

  export type TPMaxAggregateInputType = {
    id?: true
    code?: true
    description?: true
    cpId?: true
  }

  export type TPCountAggregateInputType = {
    id?: true
    code?: true
    description?: true
    cpId?: true
    _all?: true
  }

  export type TPAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TP to aggregate.
     */
    where?: TPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TPS to fetch.
     */
    orderBy?: TPOrderByWithRelationInput | TPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TPS
    **/
    _count?: true | TPCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TPAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TPSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TPMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TPMaxAggregateInputType
  }

  export type GetTPAggregateType<T extends TPAggregateArgs> = {
        [P in keyof T & keyof AggregateTP]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTP[P]>
      : GetScalarType<T[P], AggregateTP[P]>
  }




  export type TPGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TPWhereInput
    orderBy?: TPOrderByWithAggregationInput | TPOrderByWithAggregationInput[]
    by: TPScalarFieldEnum[] | TPScalarFieldEnum
    having?: TPScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TPCountAggregateInputType | true
    _avg?: TPAvgAggregateInputType
    _sum?: TPSumAggregateInputType
    _min?: TPMinAggregateInputType
    _max?: TPMaxAggregateInputType
  }

  export type TPGroupByOutputType = {
    id: number
    code: string
    description: string
    cpId: number
    _count: TPCountAggregateOutputType | null
    _avg: TPAvgAggregateOutputType | null
    _sum: TPSumAggregateOutputType | null
    _min: TPMinAggregateOutputType | null
    _max: TPMaxAggregateOutputType | null
  }

  type GetTPGroupByPayload<T extends TPGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TPGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TPGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TPGroupByOutputType[P]>
            : GetScalarType<T[P], TPGroupByOutputType[P]>
        }
      >
    >


  export type TPSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    cpId?: boolean
    cp?: boolean | CPDefaultArgs<ExtArgs>
    assessments?: boolean | TP$assessmentsArgs<ExtArgs>
    _count?: boolean | TPCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tP"]>

  export type TPSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    cpId?: boolean
    cp?: boolean | CPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tP"]>

  export type TPSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    description?: boolean
    cpId?: boolean
    cp?: boolean | CPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tP"]>

  export type TPSelectScalar = {
    id?: boolean
    code?: boolean
    description?: boolean
    cpId?: boolean
  }

  export type TPOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "description" | "cpId", ExtArgs["result"]["tP"]>
  export type TPInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cp?: boolean | CPDefaultArgs<ExtArgs>
    assessments?: boolean | TP$assessmentsArgs<ExtArgs>
    _count?: boolean | TPCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TPIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cp?: boolean | CPDefaultArgs<ExtArgs>
  }
  export type TPIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cp?: boolean | CPDefaultArgs<ExtArgs>
  }

  export type $TPPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TP"
    objects: {
      cp: Prisma.$CPPayload<ExtArgs>
      assessments: Prisma.$AssessmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      code: string
      description: string
      cpId: number
    }, ExtArgs["result"]["tP"]>
    composites: {}
  }

  type TPGetPayload<S extends boolean | null | undefined | TPDefaultArgs> = $Result.GetResult<Prisma.$TPPayload, S>

  type TPCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TPFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TPCountAggregateInputType | true
    }

  export interface TPDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TP'], meta: { name: 'TP' } }
    /**
     * Find zero or one TP that matches the filter.
     * @param {TPFindUniqueArgs} args - Arguments to find a TP
     * @example
     * // Get one TP
     * const tP = await prisma.tP.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TPFindUniqueArgs>(args: SelectSubset<T, TPFindUniqueArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TP that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TPFindUniqueOrThrowArgs} args - Arguments to find a TP
     * @example
     * // Get one TP
     * const tP = await prisma.tP.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TPFindUniqueOrThrowArgs>(args: SelectSubset<T, TPFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TP that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TPFindFirstArgs} args - Arguments to find a TP
     * @example
     * // Get one TP
     * const tP = await prisma.tP.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TPFindFirstArgs>(args?: SelectSubset<T, TPFindFirstArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TP that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TPFindFirstOrThrowArgs} args - Arguments to find a TP
     * @example
     * // Get one TP
     * const tP = await prisma.tP.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TPFindFirstOrThrowArgs>(args?: SelectSubset<T, TPFindFirstOrThrowArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TPS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TPFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TPS
     * const tPS = await prisma.tP.findMany()
     * 
     * // Get first 10 TPS
     * const tPS = await prisma.tP.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tPWithIdOnly = await prisma.tP.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TPFindManyArgs>(args?: SelectSubset<T, TPFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TP.
     * @param {TPCreateArgs} args - Arguments to create a TP.
     * @example
     * // Create one TP
     * const TP = await prisma.tP.create({
     *   data: {
     *     // ... data to create a TP
     *   }
     * })
     * 
     */
    create<T extends TPCreateArgs>(args: SelectSubset<T, TPCreateArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TPS.
     * @param {TPCreateManyArgs} args - Arguments to create many TPS.
     * @example
     * // Create many TPS
     * const tP = await prisma.tP.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TPCreateManyArgs>(args?: SelectSubset<T, TPCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TPS and returns the data saved in the database.
     * @param {TPCreateManyAndReturnArgs} args - Arguments to create many TPS.
     * @example
     * // Create many TPS
     * const tP = await prisma.tP.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TPS and only return the `id`
     * const tPWithIdOnly = await prisma.tP.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TPCreateManyAndReturnArgs>(args?: SelectSubset<T, TPCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TP.
     * @param {TPDeleteArgs} args - Arguments to delete one TP.
     * @example
     * // Delete one TP
     * const TP = await prisma.tP.delete({
     *   where: {
     *     // ... filter to delete one TP
     *   }
     * })
     * 
     */
    delete<T extends TPDeleteArgs>(args: SelectSubset<T, TPDeleteArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TP.
     * @param {TPUpdateArgs} args - Arguments to update one TP.
     * @example
     * // Update one TP
     * const tP = await prisma.tP.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TPUpdateArgs>(args: SelectSubset<T, TPUpdateArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TPS.
     * @param {TPDeleteManyArgs} args - Arguments to filter TPS to delete.
     * @example
     * // Delete a few TPS
     * const { count } = await prisma.tP.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TPDeleteManyArgs>(args?: SelectSubset<T, TPDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TPUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TPS
     * const tP = await prisma.tP.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TPUpdateManyArgs>(args: SelectSubset<T, TPUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TPS and returns the data updated in the database.
     * @param {TPUpdateManyAndReturnArgs} args - Arguments to update many TPS.
     * @example
     * // Update many TPS
     * const tP = await prisma.tP.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TPS and only return the `id`
     * const tPWithIdOnly = await prisma.tP.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TPUpdateManyAndReturnArgs>(args: SelectSubset<T, TPUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TP.
     * @param {TPUpsertArgs} args - Arguments to update or create a TP.
     * @example
     * // Update or create a TP
     * const tP = await prisma.tP.upsert({
     *   create: {
     *     // ... data to create a TP
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TP we want to update
     *   }
     * })
     */
    upsert<T extends TPUpsertArgs>(args: SelectSubset<T, TPUpsertArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TPS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TPCountArgs} args - Arguments to filter TPS to count.
     * @example
     * // Count the number of TPS
     * const count = await prisma.tP.count({
     *   where: {
     *     // ... the filter for the TPS we want to count
     *   }
     * })
    **/
    count<T extends TPCountArgs>(
      args?: Subset<T, TPCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TPCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TPAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TPAggregateArgs>(args: Subset<T, TPAggregateArgs>): Prisma.PrismaPromise<GetTPAggregateType<T>>

    /**
     * Group by TP.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TPGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TPGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TPGroupByArgs['orderBy'] }
        : { orderBy?: TPGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TPGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTPGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TP model
   */
  readonly fields: TPFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TP.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TPClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cp<T extends CPDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CPDefaultArgs<ExtArgs>>): Prisma__CPClient<$Result.GetResult<Prisma.$CPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assessments<T extends TP$assessmentsArgs<ExtArgs> = {}>(args?: Subset<T, TP$assessmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TP model
   */
  interface TPFieldRefs {
    readonly id: FieldRef<"TP", 'Int'>
    readonly code: FieldRef<"TP", 'String'>
    readonly description: FieldRef<"TP", 'String'>
    readonly cpId: FieldRef<"TP", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TP findUnique
   */
  export type TPFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * Filter, which TP to fetch.
     */
    where: TPWhereUniqueInput
  }

  /**
   * TP findUniqueOrThrow
   */
  export type TPFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * Filter, which TP to fetch.
     */
    where: TPWhereUniqueInput
  }

  /**
   * TP findFirst
   */
  export type TPFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * Filter, which TP to fetch.
     */
    where?: TPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TPS to fetch.
     */
    orderBy?: TPOrderByWithRelationInput | TPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TPS.
     */
    cursor?: TPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TPS.
     */
    distinct?: TPScalarFieldEnum | TPScalarFieldEnum[]
  }

  /**
   * TP findFirstOrThrow
   */
  export type TPFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * Filter, which TP to fetch.
     */
    where?: TPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TPS to fetch.
     */
    orderBy?: TPOrderByWithRelationInput | TPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TPS.
     */
    cursor?: TPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TPS.
     */
    distinct?: TPScalarFieldEnum | TPScalarFieldEnum[]
  }

  /**
   * TP findMany
   */
  export type TPFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * Filter, which TPS to fetch.
     */
    where?: TPWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TPS to fetch.
     */
    orderBy?: TPOrderByWithRelationInput | TPOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TPS.
     */
    cursor?: TPWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TPS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TPS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TPS.
     */
    distinct?: TPScalarFieldEnum | TPScalarFieldEnum[]
  }

  /**
   * TP create
   */
  export type TPCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * The data needed to create a TP.
     */
    data: XOR<TPCreateInput, TPUncheckedCreateInput>
  }

  /**
   * TP createMany
   */
  export type TPCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TPS.
     */
    data: TPCreateManyInput | TPCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TP createManyAndReturn
   */
  export type TPCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * The data used to create many TPS.
     */
    data: TPCreateManyInput | TPCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TP update
   */
  export type TPUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * The data needed to update a TP.
     */
    data: XOR<TPUpdateInput, TPUncheckedUpdateInput>
    /**
     * Choose, which TP to update.
     */
    where: TPWhereUniqueInput
  }

  /**
   * TP updateMany
   */
  export type TPUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TPS.
     */
    data: XOR<TPUpdateManyMutationInput, TPUncheckedUpdateManyInput>
    /**
     * Filter which TPS to update
     */
    where?: TPWhereInput
    /**
     * Limit how many TPS to update.
     */
    limit?: number
  }

  /**
   * TP updateManyAndReturn
   */
  export type TPUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * The data used to update TPS.
     */
    data: XOR<TPUpdateManyMutationInput, TPUncheckedUpdateManyInput>
    /**
     * Filter which TPS to update
     */
    where?: TPWhereInput
    /**
     * Limit how many TPS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TP upsert
   */
  export type TPUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * The filter to search for the TP to update in case it exists.
     */
    where: TPWhereUniqueInput
    /**
     * In case the TP found by the `where` argument doesn't exist, create a new TP with this data.
     */
    create: XOR<TPCreateInput, TPUncheckedCreateInput>
    /**
     * In case the TP was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TPUpdateInput, TPUncheckedUpdateInput>
  }

  /**
   * TP delete
   */
  export type TPDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
    /**
     * Filter which TP to delete.
     */
    where: TPWhereUniqueInput
  }

  /**
   * TP deleteMany
   */
  export type TPDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TPS to delete
     */
    where?: TPWhereInput
    /**
     * Limit how many TPS to delete.
     */
    limit?: number
  }

  /**
   * TP.assessments
   */
  export type TP$assessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    cursor?: AssessmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * TP without action
   */
  export type TPDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TP
     */
    select?: TPSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TP
     */
    omit?: TPOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TPInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    nisn: string | null
    fullname: string | null
    birth_info: string | null
    gender: string | null
    class_name: string | null
    address: string | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    nisn: string | null
    fullname: string | null
    birth_info: string | null
    gender: string | null
    class_name: string | null
    address: string | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    nisn: number
    fullname: number
    birth_info: number
    gender: number
    class_name: number
    address: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    nisn?: true
    fullname?: true
    birth_info?: true
    gender?: true
    class_name?: true
    address?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    nisn?: true
    fullname?: true
    birth_info?: true
    gender?: true
    class_name?: true
    address?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    nisn?: true
    fullname?: true
    birth_info?: true
    gender?: true
    class_name?: true
    address?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    nisn: string
    fullname: string
    birth_info: string | null
    gender: string
    class_name: string
    address: string | null
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisn?: boolean
    fullname?: boolean
    birth_info?: boolean
    gender?: boolean
    class_name?: boolean
    address?: boolean
    assessments?: boolean | Student$assessmentsArgs<ExtArgs>
    attendances?: boolean | Student$attendancesArgs<ExtArgs>
    homeroomNote?: boolean | Student$homeroomNoteArgs<ExtArgs>
    personality?: boolean | Student$personalityArgs<ExtArgs>
    scoreRecords?: boolean | Student$scoreRecordsArgs<ExtArgs>
    tahfidzs?: boolean | Student$tahfidzsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisn?: boolean
    fullname?: boolean
    birth_info?: boolean
    gender?: boolean
    class_name?: boolean
    address?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisn?: boolean
    fullname?: boolean
    birth_info?: boolean
    gender?: boolean
    class_name?: boolean
    address?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    nisn?: boolean
    fullname?: boolean
    birth_info?: boolean
    gender?: boolean
    class_name?: boolean
    address?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nisn" | "fullname" | "birth_info" | "gender" | "class_name" | "address", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assessments?: boolean | Student$assessmentsArgs<ExtArgs>
    attendances?: boolean | Student$attendancesArgs<ExtArgs>
    homeroomNote?: boolean | Student$homeroomNoteArgs<ExtArgs>
    personality?: boolean | Student$personalityArgs<ExtArgs>
    scoreRecords?: boolean | Student$scoreRecordsArgs<ExtArgs>
    tahfidzs?: boolean | Student$tahfidzsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      assessments: Prisma.$AssessmentPayload<ExtArgs>[]
      attendances: Prisma.$AttendancePayload<ExtArgs>[]
      homeroomNote: Prisma.$HomeroomNotePayload<ExtArgs> | null
      personality: Prisma.$PersonalityPayload<ExtArgs> | null
      scoreRecords: Prisma.$ScoreRecordPayload<ExtArgs>[]
      tahfidzs: Prisma.$TahfidzPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nisn: string
      fullname: string
      birth_info: string | null
      gender: string
      class_name: string
      address: string | null
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assessments<T extends Student$assessmentsArgs<ExtArgs> = {}>(args?: Subset<T, Student$assessmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attendances<T extends Student$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, Student$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    homeroomNote<T extends Student$homeroomNoteArgs<ExtArgs> = {}>(args?: Subset<T, Student$homeroomNoteArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    personality<T extends Student$personalityArgs<ExtArgs> = {}>(args?: Subset<T, Student$personalityArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    scoreRecords<T extends Student$scoreRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Student$scoreRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tahfidzs<T extends Student$tahfidzsArgs<ExtArgs> = {}>(args?: Subset<T, Student$tahfidzsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly nisn: FieldRef<"Student", 'String'>
    readonly fullname: FieldRef<"Student", 'String'>
    readonly birth_info: FieldRef<"Student", 'String'>
    readonly gender: FieldRef<"Student", 'String'>
    readonly class_name: FieldRef<"Student", 'String'>
    readonly address: FieldRef<"Student", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.assessments
   */
  export type Student$assessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    cursor?: AssessmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Student.attendances
   */
  export type Student$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Student.homeroomNote
   */
  export type Student$homeroomNoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    where?: HomeroomNoteWhereInput
  }

  /**
   * Student.personality
   */
  export type Student$personalityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    where?: PersonalityWhereInput
  }

  /**
   * Student.scoreRecords
   */
  export type Student$scoreRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    where?: ScoreRecordWhereInput
    orderBy?: ScoreRecordOrderByWithRelationInput | ScoreRecordOrderByWithRelationInput[]
    cursor?: ScoreRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScoreRecordScalarFieldEnum | ScoreRecordScalarFieldEnum[]
  }

  /**
   * Student.tahfidzs
   */
  export type Student$tahfidzsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    where?: TahfidzWhereInput
    orderBy?: TahfidzOrderByWithRelationInput | TahfidzOrderByWithRelationInput[]
    cursor?: TahfidzWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TahfidzScalarFieldEnum | TahfidzScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Assessment
   */

  export type AggregateAssessment = {
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  export type AssessmentAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    tpId: number | null
    score: number | null
  }

  export type AssessmentSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    tpId: number | null
    score: number | null
  }

  export type AssessmentMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    tpId: number | null
    score: number | null
    type: string | null
  }

  export type AssessmentMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    tpId: number | null
    score: number | null
    type: string | null
  }

  export type AssessmentCountAggregateOutputType = {
    id: number
    studentId: number
    tpId: number
    score: number
    type: number
    _all: number
  }


  export type AssessmentAvgAggregateInputType = {
    id?: true
    studentId?: true
    tpId?: true
    score?: true
  }

  export type AssessmentSumAggregateInputType = {
    id?: true
    studentId?: true
    tpId?: true
    score?: true
  }

  export type AssessmentMinAggregateInputType = {
    id?: true
    studentId?: true
    tpId?: true
    score?: true
    type?: true
  }

  export type AssessmentMaxAggregateInputType = {
    id?: true
    studentId?: true
    tpId?: true
    score?: true
    type?: true
  }

  export type AssessmentCountAggregateInputType = {
    id?: true
    studentId?: true
    tpId?: true
    score?: true
    type?: true
    _all?: true
  }

  export type AssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessment to aggregate.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assessments
    **/
    _count?: true | AssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentMaxAggregateInputType
  }

  export type GetAssessmentAggregateType<T extends AssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessment[P]>
      : GetScalarType<T[P], AggregateAssessment[P]>
  }




  export type AssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithAggregationInput | AssessmentOrderByWithAggregationInput[]
    by: AssessmentScalarFieldEnum[] | AssessmentScalarFieldEnum
    having?: AssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentCountAggregateInputType | true
    _avg?: AssessmentAvgAggregateInputType
    _sum?: AssessmentSumAggregateInputType
    _min?: AssessmentMinAggregateInputType
    _max?: AssessmentMaxAggregateInputType
  }

  export type AssessmentGroupByOutputType = {
    id: number
    studentId: number
    tpId: number
    score: number
    type: string
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  type GetAssessmentGroupByPayload<T extends AssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    tpId?: boolean
    score?: boolean
    type?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    tp?: boolean | TPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    tpId?: boolean
    score?: boolean
    type?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    tp?: boolean | TPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    tpId?: boolean
    score?: boolean
    type?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    tp?: boolean | TPDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectScalar = {
    id?: boolean
    studentId?: boolean
    tpId?: boolean
    score?: boolean
    type?: boolean
  }

  export type AssessmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "tpId" | "score" | "type", ExtArgs["result"]["assessment"]>
  export type AssessmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    tp?: boolean | TPDefaultArgs<ExtArgs>
  }
  export type AssessmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    tp?: boolean | TPDefaultArgs<ExtArgs>
  }
  export type AssessmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    tp?: boolean | TPDefaultArgs<ExtArgs>
  }

  export type $AssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assessment"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      tp: Prisma.$TPPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      tpId: number
      score: number
      type: string
    }, ExtArgs["result"]["assessment"]>
    composites: {}
  }

  type AssessmentGetPayload<S extends boolean | null | undefined | AssessmentDefaultArgs> = $Result.GetResult<Prisma.$AssessmentPayload, S>

  type AssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentCountAggregateInputType | true
    }

  export interface AssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assessment'], meta: { name: 'Assessment' } }
    /**
     * Find zero or one Assessment that matches the filter.
     * @param {AssessmentFindUniqueArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentFindUniqueArgs>(args: SelectSubset<T, AssessmentFindUniqueArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assessment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentFindUniqueOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentFindFirstArgs>(args?: SelectSubset<T, AssessmentFindFirstArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assessments
     * const assessments = await prisma.assessment.findMany()
     * 
     * // Get first 10 Assessments
     * const assessments = await prisma.assessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentWithIdOnly = await prisma.assessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentFindManyArgs>(args?: SelectSubset<T, AssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assessment.
     * @param {AssessmentCreateArgs} args - Arguments to create a Assessment.
     * @example
     * // Create one Assessment
     * const Assessment = await prisma.assessment.create({
     *   data: {
     *     // ... data to create a Assessment
     *   }
     * })
     * 
     */
    create<T extends AssessmentCreateArgs>(args: SelectSubset<T, AssessmentCreateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assessments.
     * @param {AssessmentCreateManyArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentCreateManyArgs>(args?: SelectSubset<T, AssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assessments and returns the data saved in the database.
     * @param {AssessmentCreateManyAndReturnArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assessment.
     * @param {AssessmentDeleteArgs} args - Arguments to delete one Assessment.
     * @example
     * // Delete one Assessment
     * const Assessment = await prisma.assessment.delete({
     *   where: {
     *     // ... filter to delete one Assessment
     *   }
     * })
     * 
     */
    delete<T extends AssessmentDeleteArgs>(args: SelectSubset<T, AssessmentDeleteArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assessment.
     * @param {AssessmentUpdateArgs} args - Arguments to update one Assessment.
     * @example
     * // Update one Assessment
     * const assessment = await prisma.assessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentUpdateArgs>(args: SelectSubset<T, AssessmentUpdateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assessments.
     * @param {AssessmentDeleteManyArgs} args - Arguments to filter Assessments to delete.
     * @example
     * // Delete a few Assessments
     * const { count } = await prisma.assessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentDeleteManyArgs>(args?: SelectSubset<T, AssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentUpdateManyArgs>(args: SelectSubset<T, AssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments and returns the data updated in the database.
     * @param {AssessmentUpdateManyAndReturnArgs} args - Arguments to update many Assessments.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assessment.
     * @param {AssessmentUpsertArgs} args - Arguments to update or create a Assessment.
     * @example
     * // Update or create a Assessment
     * const assessment = await prisma.assessment.upsert({
     *   create: {
     *     // ... data to create a Assessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assessment we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentUpsertArgs>(args: SelectSubset<T, AssessmentUpsertArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentCountArgs} args - Arguments to filter Assessments to count.
     * @example
     * // Count the number of Assessments
     * const count = await prisma.assessment.count({
     *   where: {
     *     // ... the filter for the Assessments we want to count
     *   }
     * })
    **/
    count<T extends AssessmentCountArgs>(
      args?: Subset<T, AssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentAggregateArgs>(args: Subset<T, AssessmentAggregateArgs>): Prisma.PrismaPromise<GetAssessmentAggregateType<T>>

    /**
     * Group by Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assessment model
   */
  readonly fields: AssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tp<T extends TPDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TPDefaultArgs<ExtArgs>>): Prisma__TPClient<$Result.GetResult<Prisma.$TPPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assessment model
   */
  interface AssessmentFieldRefs {
    readonly id: FieldRef<"Assessment", 'Int'>
    readonly studentId: FieldRef<"Assessment", 'Int'>
    readonly tpId: FieldRef<"Assessment", 'Int'>
    readonly score: FieldRef<"Assessment", 'Int'>
    readonly type: FieldRef<"Assessment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Assessment findUnique
   */
  export type AssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findUniqueOrThrow
   */
  export type AssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findFirst
   */
  export type AssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findFirstOrThrow
   */
  export type AssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findMany
   */
  export type AssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessments to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment create
   */
  export type AssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assessment.
     */
    data: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
  }

  /**
   * Assessment createMany
   */
  export type AssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assessment createManyAndReturn
   */
  export type AssessmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment update
   */
  export type AssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assessment.
     */
    data: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
    /**
     * Choose, which Assessment to update.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment updateMany
   */
  export type AssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
  }

  /**
   * Assessment updateManyAndReturn
   */
  export type AssessmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment upsert
   */
  export type AssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assessment to update in case it exists.
     */
    where: AssessmentWhereUniqueInput
    /**
     * In case the Assessment found by the `where` argument doesn't exist, create a new Assessment with this data.
     */
    create: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
    /**
     * In case the Assessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
  }

  /**
   * Assessment delete
   */
  export type AssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter which Assessment to delete.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment deleteMany
   */
  export type AssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessments to delete
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to delete.
     */
    limit?: number
  }

  /**
   * Assessment without action
   */
  export type AssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
  }


  /**
   * Model Tahfidz
   */

  export type AggregateTahfidz = {
    _count: TahfidzCountAggregateOutputType | null
    _avg: TahfidzAvgAggregateOutputType | null
    _sum: TahfidzSumAggregateOutputType | null
    _min: TahfidzMinAggregateOutputType | null
    _max: TahfidzMaxAggregateOutputType | null
  }

  export type TahfidzAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    juz: number | null
  }

  export type TahfidzSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    juz: number | null
  }

  export type TahfidzMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    juz: number | null
    surah: string | null
    ayat: string | null
    predicate: string | null
    date: Date | null
  }

  export type TahfidzMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    juz: number | null
    surah: string | null
    ayat: string | null
    predicate: string | null
    date: Date | null
  }

  export type TahfidzCountAggregateOutputType = {
    id: number
    studentId: number
    juz: number
    surah: number
    ayat: number
    predicate: number
    date: number
    _all: number
  }


  export type TahfidzAvgAggregateInputType = {
    id?: true
    studentId?: true
    juz?: true
  }

  export type TahfidzSumAggregateInputType = {
    id?: true
    studentId?: true
    juz?: true
  }

  export type TahfidzMinAggregateInputType = {
    id?: true
    studentId?: true
    juz?: true
    surah?: true
    ayat?: true
    predicate?: true
    date?: true
  }

  export type TahfidzMaxAggregateInputType = {
    id?: true
    studentId?: true
    juz?: true
    surah?: true
    ayat?: true
    predicate?: true
    date?: true
  }

  export type TahfidzCountAggregateInputType = {
    id?: true
    studentId?: true
    juz?: true
    surah?: true
    ayat?: true
    predicate?: true
    date?: true
    _all?: true
  }

  export type TahfidzAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tahfidz to aggregate.
     */
    where?: TahfidzWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tahfidzs to fetch.
     */
    orderBy?: TahfidzOrderByWithRelationInput | TahfidzOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TahfidzWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tahfidzs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tahfidzs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tahfidzs
    **/
    _count?: true | TahfidzCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TahfidzAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TahfidzSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TahfidzMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TahfidzMaxAggregateInputType
  }

  export type GetTahfidzAggregateType<T extends TahfidzAggregateArgs> = {
        [P in keyof T & keyof AggregateTahfidz]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTahfidz[P]>
      : GetScalarType<T[P], AggregateTahfidz[P]>
  }




  export type TahfidzGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TahfidzWhereInput
    orderBy?: TahfidzOrderByWithAggregationInput | TahfidzOrderByWithAggregationInput[]
    by: TahfidzScalarFieldEnum[] | TahfidzScalarFieldEnum
    having?: TahfidzScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TahfidzCountAggregateInputType | true
    _avg?: TahfidzAvgAggregateInputType
    _sum?: TahfidzSumAggregateInputType
    _min?: TahfidzMinAggregateInputType
    _max?: TahfidzMaxAggregateInputType
  }

  export type TahfidzGroupByOutputType = {
    id: number
    studentId: number
    juz: number
    surah: string
    ayat: string
    predicate: string
    date: Date
    _count: TahfidzCountAggregateOutputType | null
    _avg: TahfidzAvgAggregateOutputType | null
    _sum: TahfidzSumAggregateOutputType | null
    _min: TahfidzMinAggregateOutputType | null
    _max: TahfidzMaxAggregateOutputType | null
  }

  type GetTahfidzGroupByPayload<T extends TahfidzGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TahfidzGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TahfidzGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TahfidzGroupByOutputType[P]>
            : GetScalarType<T[P], TahfidzGroupByOutputType[P]>
        }
      >
    >


  export type TahfidzSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    juz?: boolean
    surah?: boolean
    ayat?: boolean
    predicate?: boolean
    date?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tahfidz"]>

  export type TahfidzSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    juz?: boolean
    surah?: boolean
    ayat?: boolean
    predicate?: boolean
    date?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tahfidz"]>

  export type TahfidzSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    juz?: boolean
    surah?: boolean
    ayat?: boolean
    predicate?: boolean
    date?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tahfidz"]>

  export type TahfidzSelectScalar = {
    id?: boolean
    studentId?: boolean
    juz?: boolean
    surah?: boolean
    ayat?: boolean
    predicate?: boolean
    date?: boolean
  }

  export type TahfidzOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "juz" | "surah" | "ayat" | "predicate" | "date", ExtArgs["result"]["tahfidz"]>
  export type TahfidzInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TahfidzIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type TahfidzIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $TahfidzPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tahfidz"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      juz: number
      surah: string
      ayat: string
      predicate: string
      date: Date
    }, ExtArgs["result"]["tahfidz"]>
    composites: {}
  }

  type TahfidzGetPayload<S extends boolean | null | undefined | TahfidzDefaultArgs> = $Result.GetResult<Prisma.$TahfidzPayload, S>

  type TahfidzCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TahfidzFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TahfidzCountAggregateInputType | true
    }

  export interface TahfidzDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tahfidz'], meta: { name: 'Tahfidz' } }
    /**
     * Find zero or one Tahfidz that matches the filter.
     * @param {TahfidzFindUniqueArgs} args - Arguments to find a Tahfidz
     * @example
     * // Get one Tahfidz
     * const tahfidz = await prisma.tahfidz.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TahfidzFindUniqueArgs>(args: SelectSubset<T, TahfidzFindUniqueArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tahfidz that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TahfidzFindUniqueOrThrowArgs} args - Arguments to find a Tahfidz
     * @example
     * // Get one Tahfidz
     * const tahfidz = await prisma.tahfidz.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TahfidzFindUniqueOrThrowArgs>(args: SelectSubset<T, TahfidzFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tahfidz that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahfidzFindFirstArgs} args - Arguments to find a Tahfidz
     * @example
     * // Get one Tahfidz
     * const tahfidz = await prisma.tahfidz.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TahfidzFindFirstArgs>(args?: SelectSubset<T, TahfidzFindFirstArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tahfidz that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahfidzFindFirstOrThrowArgs} args - Arguments to find a Tahfidz
     * @example
     * // Get one Tahfidz
     * const tahfidz = await prisma.tahfidz.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TahfidzFindFirstOrThrowArgs>(args?: SelectSubset<T, TahfidzFindFirstOrThrowArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tahfidzs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahfidzFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tahfidzs
     * const tahfidzs = await prisma.tahfidz.findMany()
     * 
     * // Get first 10 Tahfidzs
     * const tahfidzs = await prisma.tahfidz.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tahfidzWithIdOnly = await prisma.tahfidz.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TahfidzFindManyArgs>(args?: SelectSubset<T, TahfidzFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tahfidz.
     * @param {TahfidzCreateArgs} args - Arguments to create a Tahfidz.
     * @example
     * // Create one Tahfidz
     * const Tahfidz = await prisma.tahfidz.create({
     *   data: {
     *     // ... data to create a Tahfidz
     *   }
     * })
     * 
     */
    create<T extends TahfidzCreateArgs>(args: SelectSubset<T, TahfidzCreateArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tahfidzs.
     * @param {TahfidzCreateManyArgs} args - Arguments to create many Tahfidzs.
     * @example
     * // Create many Tahfidzs
     * const tahfidz = await prisma.tahfidz.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TahfidzCreateManyArgs>(args?: SelectSubset<T, TahfidzCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tahfidzs and returns the data saved in the database.
     * @param {TahfidzCreateManyAndReturnArgs} args - Arguments to create many Tahfidzs.
     * @example
     * // Create many Tahfidzs
     * const tahfidz = await prisma.tahfidz.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tahfidzs and only return the `id`
     * const tahfidzWithIdOnly = await prisma.tahfidz.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TahfidzCreateManyAndReturnArgs>(args?: SelectSubset<T, TahfidzCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tahfidz.
     * @param {TahfidzDeleteArgs} args - Arguments to delete one Tahfidz.
     * @example
     * // Delete one Tahfidz
     * const Tahfidz = await prisma.tahfidz.delete({
     *   where: {
     *     // ... filter to delete one Tahfidz
     *   }
     * })
     * 
     */
    delete<T extends TahfidzDeleteArgs>(args: SelectSubset<T, TahfidzDeleteArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tahfidz.
     * @param {TahfidzUpdateArgs} args - Arguments to update one Tahfidz.
     * @example
     * // Update one Tahfidz
     * const tahfidz = await prisma.tahfidz.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TahfidzUpdateArgs>(args: SelectSubset<T, TahfidzUpdateArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tahfidzs.
     * @param {TahfidzDeleteManyArgs} args - Arguments to filter Tahfidzs to delete.
     * @example
     * // Delete a few Tahfidzs
     * const { count } = await prisma.tahfidz.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TahfidzDeleteManyArgs>(args?: SelectSubset<T, TahfidzDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tahfidzs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahfidzUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tahfidzs
     * const tahfidz = await prisma.tahfidz.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TahfidzUpdateManyArgs>(args: SelectSubset<T, TahfidzUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tahfidzs and returns the data updated in the database.
     * @param {TahfidzUpdateManyAndReturnArgs} args - Arguments to update many Tahfidzs.
     * @example
     * // Update many Tahfidzs
     * const tahfidz = await prisma.tahfidz.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tahfidzs and only return the `id`
     * const tahfidzWithIdOnly = await prisma.tahfidz.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TahfidzUpdateManyAndReturnArgs>(args: SelectSubset<T, TahfidzUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tahfidz.
     * @param {TahfidzUpsertArgs} args - Arguments to update or create a Tahfidz.
     * @example
     * // Update or create a Tahfidz
     * const tahfidz = await prisma.tahfidz.upsert({
     *   create: {
     *     // ... data to create a Tahfidz
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tahfidz we want to update
     *   }
     * })
     */
    upsert<T extends TahfidzUpsertArgs>(args: SelectSubset<T, TahfidzUpsertArgs<ExtArgs>>): Prisma__TahfidzClient<$Result.GetResult<Prisma.$TahfidzPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tahfidzs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahfidzCountArgs} args - Arguments to filter Tahfidzs to count.
     * @example
     * // Count the number of Tahfidzs
     * const count = await prisma.tahfidz.count({
     *   where: {
     *     // ... the filter for the Tahfidzs we want to count
     *   }
     * })
    **/
    count<T extends TahfidzCountArgs>(
      args?: Subset<T, TahfidzCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TahfidzCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tahfidz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahfidzAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TahfidzAggregateArgs>(args: Subset<T, TahfidzAggregateArgs>): Prisma.PrismaPromise<GetTahfidzAggregateType<T>>

    /**
     * Group by Tahfidz.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahfidzGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TahfidzGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TahfidzGroupByArgs['orderBy'] }
        : { orderBy?: TahfidzGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TahfidzGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTahfidzGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tahfidz model
   */
  readonly fields: TahfidzFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tahfidz.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TahfidzClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tahfidz model
   */
  interface TahfidzFieldRefs {
    readonly id: FieldRef<"Tahfidz", 'Int'>
    readonly studentId: FieldRef<"Tahfidz", 'Int'>
    readonly juz: FieldRef<"Tahfidz", 'Int'>
    readonly surah: FieldRef<"Tahfidz", 'String'>
    readonly ayat: FieldRef<"Tahfidz", 'String'>
    readonly predicate: FieldRef<"Tahfidz", 'String'>
    readonly date: FieldRef<"Tahfidz", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tahfidz findUnique
   */
  export type TahfidzFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * Filter, which Tahfidz to fetch.
     */
    where: TahfidzWhereUniqueInput
  }

  /**
   * Tahfidz findUniqueOrThrow
   */
  export type TahfidzFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * Filter, which Tahfidz to fetch.
     */
    where: TahfidzWhereUniqueInput
  }

  /**
   * Tahfidz findFirst
   */
  export type TahfidzFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * Filter, which Tahfidz to fetch.
     */
    where?: TahfidzWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tahfidzs to fetch.
     */
    orderBy?: TahfidzOrderByWithRelationInput | TahfidzOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tahfidzs.
     */
    cursor?: TahfidzWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tahfidzs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tahfidzs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tahfidzs.
     */
    distinct?: TahfidzScalarFieldEnum | TahfidzScalarFieldEnum[]
  }

  /**
   * Tahfidz findFirstOrThrow
   */
  export type TahfidzFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * Filter, which Tahfidz to fetch.
     */
    where?: TahfidzWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tahfidzs to fetch.
     */
    orderBy?: TahfidzOrderByWithRelationInput | TahfidzOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tahfidzs.
     */
    cursor?: TahfidzWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tahfidzs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tahfidzs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tahfidzs.
     */
    distinct?: TahfidzScalarFieldEnum | TahfidzScalarFieldEnum[]
  }

  /**
   * Tahfidz findMany
   */
  export type TahfidzFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * Filter, which Tahfidzs to fetch.
     */
    where?: TahfidzWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tahfidzs to fetch.
     */
    orderBy?: TahfidzOrderByWithRelationInput | TahfidzOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tahfidzs.
     */
    cursor?: TahfidzWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tahfidzs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tahfidzs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tahfidzs.
     */
    distinct?: TahfidzScalarFieldEnum | TahfidzScalarFieldEnum[]
  }

  /**
   * Tahfidz create
   */
  export type TahfidzCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * The data needed to create a Tahfidz.
     */
    data: XOR<TahfidzCreateInput, TahfidzUncheckedCreateInput>
  }

  /**
   * Tahfidz createMany
   */
  export type TahfidzCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tahfidzs.
     */
    data: TahfidzCreateManyInput | TahfidzCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tahfidz createManyAndReturn
   */
  export type TahfidzCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * The data used to create many Tahfidzs.
     */
    data: TahfidzCreateManyInput | TahfidzCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tahfidz update
   */
  export type TahfidzUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * The data needed to update a Tahfidz.
     */
    data: XOR<TahfidzUpdateInput, TahfidzUncheckedUpdateInput>
    /**
     * Choose, which Tahfidz to update.
     */
    where: TahfidzWhereUniqueInput
  }

  /**
   * Tahfidz updateMany
   */
  export type TahfidzUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tahfidzs.
     */
    data: XOR<TahfidzUpdateManyMutationInput, TahfidzUncheckedUpdateManyInput>
    /**
     * Filter which Tahfidzs to update
     */
    where?: TahfidzWhereInput
    /**
     * Limit how many Tahfidzs to update.
     */
    limit?: number
  }

  /**
   * Tahfidz updateManyAndReturn
   */
  export type TahfidzUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * The data used to update Tahfidzs.
     */
    data: XOR<TahfidzUpdateManyMutationInput, TahfidzUncheckedUpdateManyInput>
    /**
     * Filter which Tahfidzs to update
     */
    where?: TahfidzWhereInput
    /**
     * Limit how many Tahfidzs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tahfidz upsert
   */
  export type TahfidzUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * The filter to search for the Tahfidz to update in case it exists.
     */
    where: TahfidzWhereUniqueInput
    /**
     * In case the Tahfidz found by the `where` argument doesn't exist, create a new Tahfidz with this data.
     */
    create: XOR<TahfidzCreateInput, TahfidzUncheckedCreateInput>
    /**
     * In case the Tahfidz was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TahfidzUpdateInput, TahfidzUncheckedUpdateInput>
  }

  /**
   * Tahfidz delete
   */
  export type TahfidzDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
    /**
     * Filter which Tahfidz to delete.
     */
    where: TahfidzWhereUniqueInput
  }

  /**
   * Tahfidz deleteMany
   */
  export type TahfidzDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tahfidzs to delete
     */
    where?: TahfidzWhereInput
    /**
     * Limit how many Tahfidzs to delete.
     */
    limit?: number
  }

  /**
   * Tahfidz without action
   */
  export type TahfidzDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tahfidz
     */
    select?: TahfidzSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tahfidz
     */
    omit?: TahfidzOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahfidzInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    status: string | null
    date: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    status: string | null
    date: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    studentId: number
    status: number
    date: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type AttendanceSumAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    studentId?: true
    status?: true
    date?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    studentId?: true
    status?: true
    date?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    studentId?: true
    status?: true
    date?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: number
    studentId: number
    status: string
    date: Date
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    status?: boolean
    date?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    status?: boolean
    date?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    status?: boolean
    date?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectScalar = {
    id?: boolean
    studentId?: boolean
    status?: boolean
    date?: boolean
  }

  export type AttendanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "status" | "date", ExtArgs["result"]["attendance"]>
  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      status: string
      date: Date
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendanceCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances and returns the data updated in the database.
     * @param {AttendanceUpdateManyAndReturnArgs} args - Arguments to update many Attendances.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttendanceUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'Int'>
    readonly studentId: FieldRef<"Attendance", 'Int'>
    readonly status: FieldRef<"Attendance", 'String'>
    readonly date: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attendance createManyAndReturn
   */
  export type AttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
  }

  /**
   * Attendance updateManyAndReturn
   */
  export type AttendanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
    /**
     * Limit how many Attendances to delete.
     */
    limit?: number
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendance
     */
    omit?: AttendanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model ClassRoom
   */

  export type AggregateClassRoom = {
    _count: ClassRoomCountAggregateOutputType | null
    _avg: ClassRoomAvgAggregateOutputType | null
    _sum: ClassRoomSumAggregateOutputType | null
    _min: ClassRoomMinAggregateOutputType | null
    _max: ClassRoomMaxAggregateOutputType | null
  }

  export type ClassRoomAvgAggregateOutputType = {
    id: number | null
    grade: number | null
  }

  export type ClassRoomSumAggregateOutputType = {
    id: number | null
    grade: number | null
  }

  export type ClassRoomMinAggregateOutputType = {
    id: number | null
    name: string | null
    level: string | null
    grade: number | null
    status: string | null
  }

  export type ClassRoomMaxAggregateOutputType = {
    id: number | null
    name: string | null
    level: string | null
    grade: number | null
    status: string | null
  }

  export type ClassRoomCountAggregateOutputType = {
    id: number
    name: number
    level: number
    grade: number
    status: number
    _all: number
  }


  export type ClassRoomAvgAggregateInputType = {
    id?: true
    grade?: true
  }

  export type ClassRoomSumAggregateInputType = {
    id?: true
    grade?: true
  }

  export type ClassRoomMinAggregateInputType = {
    id?: true
    name?: true
    level?: true
    grade?: true
    status?: true
  }

  export type ClassRoomMaxAggregateInputType = {
    id?: true
    name?: true
    level?: true
    grade?: true
    status?: true
  }

  export type ClassRoomCountAggregateInputType = {
    id?: true
    name?: true
    level?: true
    grade?: true
    status?: true
    _all?: true
  }

  export type ClassRoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassRoom to aggregate.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClassRooms
    **/
    _count?: true | ClassRoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassRoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassRoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassRoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassRoomMaxAggregateInputType
  }

  export type GetClassRoomAggregateType<T extends ClassRoomAggregateArgs> = {
        [P in keyof T & keyof AggregateClassRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassRoom[P]>
      : GetScalarType<T[P], AggregateClassRoom[P]>
  }




  export type ClassRoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassRoomWhereInput
    orderBy?: ClassRoomOrderByWithAggregationInput | ClassRoomOrderByWithAggregationInput[]
    by: ClassRoomScalarFieldEnum[] | ClassRoomScalarFieldEnum
    having?: ClassRoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassRoomCountAggregateInputType | true
    _avg?: ClassRoomAvgAggregateInputType
    _sum?: ClassRoomSumAggregateInputType
    _min?: ClassRoomMinAggregateInputType
    _max?: ClassRoomMaxAggregateInputType
  }

  export type ClassRoomGroupByOutputType = {
    id: number
    name: string
    level: string
    grade: number
    status: string
    _count: ClassRoomCountAggregateOutputType | null
    _avg: ClassRoomAvgAggregateOutputType | null
    _sum: ClassRoomSumAggregateOutputType | null
    _min: ClassRoomMinAggregateOutputType | null
    _max: ClassRoomMaxAggregateOutputType | null
  }

  type GetClassRoomGroupByPayload<T extends ClassRoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassRoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassRoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassRoomGroupByOutputType[P]>
            : GetScalarType<T[P], ClassRoomGroupByOutputType[P]>
        }
      >
    >


  export type ClassRoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    grade?: boolean
    status?: boolean
  }, ExtArgs["result"]["classRoom"]>

  export type ClassRoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    grade?: boolean
    status?: boolean
  }, ExtArgs["result"]["classRoom"]>

  export type ClassRoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    grade?: boolean
    status?: boolean
  }, ExtArgs["result"]["classRoom"]>

  export type ClassRoomSelectScalar = {
    id?: boolean
    name?: boolean
    level?: boolean
    grade?: boolean
    status?: boolean
  }

  export type ClassRoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "level" | "grade" | "status", ExtArgs["result"]["classRoom"]>

  export type $ClassRoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClassRoom"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      level: string
      grade: number
      status: string
    }, ExtArgs["result"]["classRoom"]>
    composites: {}
  }

  type ClassRoomGetPayload<S extends boolean | null | undefined | ClassRoomDefaultArgs> = $Result.GetResult<Prisma.$ClassRoomPayload, S>

  type ClassRoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassRoomCountAggregateInputType | true
    }

  export interface ClassRoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClassRoom'], meta: { name: 'ClassRoom' } }
    /**
     * Find zero or one ClassRoom that matches the filter.
     * @param {ClassRoomFindUniqueArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassRoomFindUniqueArgs>(args: SelectSubset<T, ClassRoomFindUniqueArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClassRoom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassRoomFindUniqueOrThrowArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassRoomFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClassRoom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomFindFirstArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassRoomFindFirstArgs>(args?: SelectSubset<T, ClassRoomFindFirstArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClassRoom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomFindFirstOrThrowArgs} args - Arguments to find a ClassRoom
     * @example
     * // Get one ClassRoom
     * const classRoom = await prisma.classRoom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassRoomFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClassRooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClassRooms
     * const classRooms = await prisma.classRoom.findMany()
     * 
     * // Get first 10 ClassRooms
     * const classRooms = await prisma.classRoom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classRoomWithIdOnly = await prisma.classRoom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassRoomFindManyArgs>(args?: SelectSubset<T, ClassRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClassRoom.
     * @param {ClassRoomCreateArgs} args - Arguments to create a ClassRoom.
     * @example
     * // Create one ClassRoom
     * const ClassRoom = await prisma.classRoom.create({
     *   data: {
     *     // ... data to create a ClassRoom
     *   }
     * })
     * 
     */
    create<T extends ClassRoomCreateArgs>(args: SelectSubset<T, ClassRoomCreateArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClassRooms.
     * @param {ClassRoomCreateManyArgs} args - Arguments to create many ClassRooms.
     * @example
     * // Create many ClassRooms
     * const classRoom = await prisma.classRoom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassRoomCreateManyArgs>(args?: SelectSubset<T, ClassRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClassRooms and returns the data saved in the database.
     * @param {ClassRoomCreateManyAndReturnArgs} args - Arguments to create many ClassRooms.
     * @example
     * // Create many ClassRooms
     * const classRoom = await prisma.classRoom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClassRooms and only return the `id`
     * const classRoomWithIdOnly = await prisma.classRoom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassRoomCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClassRoom.
     * @param {ClassRoomDeleteArgs} args - Arguments to delete one ClassRoom.
     * @example
     * // Delete one ClassRoom
     * const ClassRoom = await prisma.classRoom.delete({
     *   where: {
     *     // ... filter to delete one ClassRoom
     *   }
     * })
     * 
     */
    delete<T extends ClassRoomDeleteArgs>(args: SelectSubset<T, ClassRoomDeleteArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClassRoom.
     * @param {ClassRoomUpdateArgs} args - Arguments to update one ClassRoom.
     * @example
     * // Update one ClassRoom
     * const classRoom = await prisma.classRoom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassRoomUpdateArgs>(args: SelectSubset<T, ClassRoomUpdateArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClassRooms.
     * @param {ClassRoomDeleteManyArgs} args - Arguments to filter ClassRooms to delete.
     * @example
     * // Delete a few ClassRooms
     * const { count } = await prisma.classRoom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassRoomDeleteManyArgs>(args?: SelectSubset<T, ClassRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClassRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClassRooms
     * const classRoom = await prisma.classRoom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassRoomUpdateManyArgs>(args: SelectSubset<T, ClassRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClassRooms and returns the data updated in the database.
     * @param {ClassRoomUpdateManyAndReturnArgs} args - Arguments to update many ClassRooms.
     * @example
     * // Update many ClassRooms
     * const classRoom = await prisma.classRoom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClassRooms and only return the `id`
     * const classRoomWithIdOnly = await prisma.classRoom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClassRoomUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClassRoom.
     * @param {ClassRoomUpsertArgs} args - Arguments to update or create a ClassRoom.
     * @example
     * // Update or create a ClassRoom
     * const classRoom = await prisma.classRoom.upsert({
     *   create: {
     *     // ... data to create a ClassRoom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClassRoom we want to update
     *   }
     * })
     */
    upsert<T extends ClassRoomUpsertArgs>(args: SelectSubset<T, ClassRoomUpsertArgs<ExtArgs>>): Prisma__ClassRoomClient<$Result.GetResult<Prisma.$ClassRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClassRooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomCountArgs} args - Arguments to filter ClassRooms to count.
     * @example
     * // Count the number of ClassRooms
     * const count = await prisma.classRoom.count({
     *   where: {
     *     // ... the filter for the ClassRooms we want to count
     *   }
     * })
    **/
    count<T extends ClassRoomCountArgs>(
      args?: Subset<T, ClassRoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassRoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClassRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassRoomAggregateArgs>(args: Subset<T, ClassRoomAggregateArgs>): Prisma.PrismaPromise<GetClassRoomAggregateType<T>>

    /**
     * Group by ClassRoom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassRoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassRoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassRoomGroupByArgs['orderBy'] }
        : { orderBy?: ClassRoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClassRoom model
   */
  readonly fields: ClassRoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClassRoom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassRoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClassRoom model
   */
  interface ClassRoomFieldRefs {
    readonly id: FieldRef<"ClassRoom", 'Int'>
    readonly name: FieldRef<"ClassRoom", 'String'>
    readonly level: FieldRef<"ClassRoom", 'String'>
    readonly grade: FieldRef<"ClassRoom", 'Int'>
    readonly status: FieldRef<"ClassRoom", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClassRoom findUnique
   */
  export type ClassRoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom findUniqueOrThrow
   */
  export type ClassRoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom findFirst
   */
  export type ClassRoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassRooms.
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassRooms.
     */
    distinct?: ClassRoomScalarFieldEnum | ClassRoomScalarFieldEnum[]
  }

  /**
   * ClassRoom findFirstOrThrow
   */
  export type ClassRoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * Filter, which ClassRoom to fetch.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClassRooms.
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassRooms.
     */
    distinct?: ClassRoomScalarFieldEnum | ClassRoomScalarFieldEnum[]
  }

  /**
   * ClassRoom findMany
   */
  export type ClassRoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * Filter, which ClassRooms to fetch.
     */
    where?: ClassRoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClassRooms to fetch.
     */
    orderBy?: ClassRoomOrderByWithRelationInput | ClassRoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClassRooms.
     */
    cursor?: ClassRoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClassRooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClassRooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClassRooms.
     */
    distinct?: ClassRoomScalarFieldEnum | ClassRoomScalarFieldEnum[]
  }

  /**
   * ClassRoom create
   */
  export type ClassRoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * The data needed to create a ClassRoom.
     */
    data: XOR<ClassRoomCreateInput, ClassRoomUncheckedCreateInput>
  }

  /**
   * ClassRoom createMany
   */
  export type ClassRoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClassRooms.
     */
    data: ClassRoomCreateManyInput | ClassRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClassRoom createManyAndReturn
   */
  export type ClassRoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * The data used to create many ClassRooms.
     */
    data: ClassRoomCreateManyInput | ClassRoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClassRoom update
   */
  export type ClassRoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * The data needed to update a ClassRoom.
     */
    data: XOR<ClassRoomUpdateInput, ClassRoomUncheckedUpdateInput>
    /**
     * Choose, which ClassRoom to update.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom updateMany
   */
  export type ClassRoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClassRooms.
     */
    data: XOR<ClassRoomUpdateManyMutationInput, ClassRoomUncheckedUpdateManyInput>
    /**
     * Filter which ClassRooms to update
     */
    where?: ClassRoomWhereInput
    /**
     * Limit how many ClassRooms to update.
     */
    limit?: number
  }

  /**
   * ClassRoom updateManyAndReturn
   */
  export type ClassRoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * The data used to update ClassRooms.
     */
    data: XOR<ClassRoomUpdateManyMutationInput, ClassRoomUncheckedUpdateManyInput>
    /**
     * Filter which ClassRooms to update
     */
    where?: ClassRoomWhereInput
    /**
     * Limit how many ClassRooms to update.
     */
    limit?: number
  }

  /**
   * ClassRoom upsert
   */
  export type ClassRoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * The filter to search for the ClassRoom to update in case it exists.
     */
    where: ClassRoomWhereUniqueInput
    /**
     * In case the ClassRoom found by the `where` argument doesn't exist, create a new ClassRoom with this data.
     */
    create: XOR<ClassRoomCreateInput, ClassRoomUncheckedCreateInput>
    /**
     * In case the ClassRoom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassRoomUpdateInput, ClassRoomUncheckedUpdateInput>
  }

  /**
   * ClassRoom delete
   */
  export type ClassRoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
    /**
     * Filter which ClassRoom to delete.
     */
    where: ClassRoomWhereUniqueInput
  }

  /**
   * ClassRoom deleteMany
   */
  export type ClassRoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClassRooms to delete
     */
    where?: ClassRoomWhereInput
    /**
     * Limit how many ClassRooms to delete.
     */
    limit?: number
  }

  /**
   * ClassRoom without action
   */
  export type ClassRoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassRoom
     */
    select?: ClassRoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClassRoom
     */
    omit?: ClassRoomOmit<ExtArgs> | null
  }


  /**
   * Model Assignment
   */

  export type AggregateAssignment = {
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  export type AssignmentAvgAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
  }

  export type AssignmentSumAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
  }

  export type AssignmentMinAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
    className: string | null
    academicYear: string | null
  }

  export type AssignmentMaxAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
    className: string | null
    academicYear: string | null
  }

  export type AssignmentCountAggregateOutputType = {
    id: number
    teacherId: number
    subjectId: number
    className: number
    academicYear: number
    _all: number
  }


  export type AssignmentAvgAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
  }

  export type AssignmentSumAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
  }

  export type AssignmentMinAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    className?: true
    academicYear?: true
  }

  export type AssignmentMaxAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    className?: true
    academicYear?: true
  }

  export type AssignmentCountAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    className?: true
    academicYear?: true
    _all?: true
  }

  export type AssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignment to aggregate.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assignments
    **/
    _count?: true | AssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssignmentMaxAggregateInputType
  }

  export type GetAssignmentAggregateType<T extends AssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssignment[P]>
      : GetScalarType<T[P], AggregateAssignment[P]>
  }




  export type AssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssignmentWhereInput
    orderBy?: AssignmentOrderByWithAggregationInput | AssignmentOrderByWithAggregationInput[]
    by: AssignmentScalarFieldEnum[] | AssignmentScalarFieldEnum
    having?: AssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssignmentCountAggregateInputType | true
    _avg?: AssignmentAvgAggregateInputType
    _sum?: AssignmentSumAggregateInputType
    _min?: AssignmentMinAggregateInputType
    _max?: AssignmentMaxAggregateInputType
  }

  export type AssignmentGroupByOutputType = {
    id: number
    teacherId: number
    subjectId: number
    className: string
    academicYear: string
    _count: AssignmentCountAggregateOutputType | null
    _avg: AssignmentAvgAggregateOutputType | null
    _sum: AssignmentSumAggregateOutputType | null
    _min: AssignmentMinAggregateOutputType | null
    _max: AssignmentMaxAggregateOutputType | null
  }

  type GetAssignmentGroupByPayload<T extends AssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssignmentGroupByOutputType[P]>
        }
      >
    >


  export type AssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    className?: boolean
    academicYear?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    className?: boolean
    academicYear?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    className?: boolean
    academicYear?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assignment"]>

  export type AssignmentSelectScalar = {
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    className?: boolean
    academicYear?: boolean
  }

  export type AssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teacherId" | "subjectId" | "className" | "academicYear", ExtArgs["result"]["assignment"]>
  export type AssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type AssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $AssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assignment"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      teacherId: number
      subjectId: number
      className: string
      academicYear: string
    }, ExtArgs["result"]["assignment"]>
    composites: {}
  }

  type AssignmentGetPayload<S extends boolean | null | undefined | AssignmentDefaultArgs> = $Result.GetResult<Prisma.$AssignmentPayload, S>

  type AssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssignmentCountAggregateInputType | true
    }

  export interface AssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assignment'], meta: { name: 'Assignment' } }
    /**
     * Find zero or one Assignment that matches the filter.
     * @param {AssignmentFindUniqueArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssignmentFindUniqueArgs>(args: SelectSubset<T, AssignmentFindUniqueArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssignmentFindUniqueOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssignmentFindFirstArgs>(args?: SelectSubset<T, AssignmentFindFirstArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindFirstOrThrowArgs} args - Arguments to find a Assignment
     * @example
     * // Get one Assignment
     * const assignment = await prisma.assignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assignments
     * const assignments = await prisma.assignment.findMany()
     * 
     * // Get first 10 Assignments
     * const assignments = await prisma.assignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assignmentWithIdOnly = await prisma.assignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssignmentFindManyArgs>(args?: SelectSubset<T, AssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assignment.
     * @param {AssignmentCreateArgs} args - Arguments to create a Assignment.
     * @example
     * // Create one Assignment
     * const Assignment = await prisma.assignment.create({
     *   data: {
     *     // ... data to create a Assignment
     *   }
     * })
     * 
     */
    create<T extends AssignmentCreateArgs>(args: SelectSubset<T, AssignmentCreateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assignments.
     * @param {AssignmentCreateManyArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssignmentCreateManyArgs>(args?: SelectSubset<T, AssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assignments and returns the data saved in the database.
     * @param {AssignmentCreateManyAndReturnArgs} args - Arguments to create many Assignments.
     * @example
     * // Create many Assignments
     * const assignment = await prisma.assignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assignment.
     * @param {AssignmentDeleteArgs} args - Arguments to delete one Assignment.
     * @example
     * // Delete one Assignment
     * const Assignment = await prisma.assignment.delete({
     *   where: {
     *     // ... filter to delete one Assignment
     *   }
     * })
     * 
     */
    delete<T extends AssignmentDeleteArgs>(args: SelectSubset<T, AssignmentDeleteArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assignment.
     * @param {AssignmentUpdateArgs} args - Arguments to update one Assignment.
     * @example
     * // Update one Assignment
     * const assignment = await prisma.assignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssignmentUpdateArgs>(args: SelectSubset<T, AssignmentUpdateArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assignments.
     * @param {AssignmentDeleteManyArgs} args - Arguments to filter Assignments to delete.
     * @example
     * // Delete a few Assignments
     * const { count } = await prisma.assignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssignmentDeleteManyArgs>(args?: SelectSubset<T, AssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssignmentUpdateManyArgs>(args: SelectSubset<T, AssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assignments and returns the data updated in the database.
     * @param {AssignmentUpdateManyAndReturnArgs} args - Arguments to update many Assignments.
     * @example
     * // Update many Assignments
     * const assignment = await prisma.assignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assignments and only return the `id`
     * const assignmentWithIdOnly = await prisma.assignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assignment.
     * @param {AssignmentUpsertArgs} args - Arguments to update or create a Assignment.
     * @example
     * // Update or create a Assignment
     * const assignment = await prisma.assignment.upsert({
     *   create: {
     *     // ... data to create a Assignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assignment we want to update
     *   }
     * })
     */
    upsert<T extends AssignmentUpsertArgs>(args: SelectSubset<T, AssignmentUpsertArgs<ExtArgs>>): Prisma__AssignmentClient<$Result.GetResult<Prisma.$AssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentCountArgs} args - Arguments to filter Assignments to count.
     * @example
     * // Count the number of Assignments
     * const count = await prisma.assignment.count({
     *   where: {
     *     // ... the filter for the Assignments we want to count
     *   }
     * })
    **/
    count<T extends AssignmentCountArgs>(
      args?: Subset<T, AssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssignmentAggregateArgs>(args: Subset<T, AssignmentAggregateArgs>): Prisma.PrismaPromise<GetAssignmentAggregateType<T>>

    /**
     * Group by Assignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssignmentGroupByArgs['orderBy'] }
        : { orderBy?: AssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assignment model
   */
  readonly fields: AssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assignment model
   */
  interface AssignmentFieldRefs {
    readonly id: FieldRef<"Assignment", 'Int'>
    readonly teacherId: FieldRef<"Assignment", 'Int'>
    readonly subjectId: FieldRef<"Assignment", 'Int'>
    readonly className: FieldRef<"Assignment", 'String'>
    readonly academicYear: FieldRef<"Assignment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Assignment findUnique
   */
  export type AssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findUniqueOrThrow
   */
  export type AssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment findFirst
   */
  export type AssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findFirstOrThrow
   */
  export type AssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignment to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment findMany
   */
  export type AssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter, which Assignments to fetch.
     */
    where?: AssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assignments to fetch.
     */
    orderBy?: AssignmentOrderByWithRelationInput | AssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assignments.
     */
    cursor?: AssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assignments.
     */
    distinct?: AssignmentScalarFieldEnum | AssignmentScalarFieldEnum[]
  }

  /**
   * Assignment create
   */
  export type AssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assignment.
     */
    data: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
  }

  /**
   * Assignment createMany
   */
  export type AssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assignment createManyAndReturn
   */
  export type AssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assignments.
     */
    data: AssignmentCreateManyInput | AssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment update
   */
  export type AssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assignment.
     */
    data: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
    /**
     * Choose, which Assignment to update.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment updateMany
   */
  export type AssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
  }

  /**
   * Assignment updateManyAndReturn
   */
  export type AssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * The data used to update Assignments.
     */
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyInput>
    /**
     * Filter which Assignments to update
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assignment upsert
   */
  export type AssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assignment to update in case it exists.
     */
    where: AssignmentWhereUniqueInput
    /**
     * In case the Assignment found by the `where` argument doesn't exist, create a new Assignment with this data.
     */
    create: XOR<AssignmentCreateInput, AssignmentUncheckedCreateInput>
    /**
     * In case the Assignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssignmentUpdateInput, AssignmentUncheckedUpdateInput>
  }

  /**
   * Assignment delete
   */
  export type AssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
    /**
     * Filter which Assignment to delete.
     */
    where: AssignmentWhereUniqueInput
  }

  /**
   * Assignment deleteMany
   */
  export type AssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assignments to delete
     */
    where?: AssignmentWhereInput
    /**
     * Limit how many Assignments to delete.
     */
    limit?: number
  }

  /**
   * Assignment without action
   */
  export type AssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assignment
     */
    select?: AssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assignment
     */
    omit?: AssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssignmentInclude<ExtArgs> | null
  }


  /**
   * Model ScoreRecord
   */

  export type AggregateScoreRecord = {
    _count: ScoreRecordCountAggregateOutputType | null
    _avg: ScoreRecordAvgAggregateOutputType | null
    _sum: ScoreRecordSumAggregateOutputType | null
    _min: ScoreRecordMinAggregateOutputType | null
    _max: ScoreRecordMaxAggregateOutputType | null
  }

  export type ScoreRecordAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    scoreNumber: number | null
  }

  export type ScoreRecordSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    scoreNumber: number | null
  }

  export type ScoreRecordMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    className: string | null
    type: string | null
    scoreNumber: number | null
    scoreText: string | null
  }

  export type ScoreRecordMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    className: string | null
    type: string | null
    scoreNumber: number | null
    scoreText: string | null
  }

  export type ScoreRecordCountAggregateOutputType = {
    id: number
    studentId: number
    subjectId: number
    className: number
    type: number
    scoreNumber: number
    scoreText: number
    _all: number
  }


  export type ScoreRecordAvgAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    scoreNumber?: true
  }

  export type ScoreRecordSumAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    scoreNumber?: true
  }

  export type ScoreRecordMinAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    className?: true
    type?: true
    scoreNumber?: true
    scoreText?: true
  }

  export type ScoreRecordMaxAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    className?: true
    type?: true
    scoreNumber?: true
    scoreText?: true
  }

  export type ScoreRecordCountAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    className?: true
    type?: true
    scoreNumber?: true
    scoreText?: true
    _all?: true
  }

  export type ScoreRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScoreRecord to aggregate.
     */
    where?: ScoreRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreRecords to fetch.
     */
    orderBy?: ScoreRecordOrderByWithRelationInput | ScoreRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScoreRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScoreRecords
    **/
    _count?: true | ScoreRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScoreRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScoreRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScoreRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScoreRecordMaxAggregateInputType
  }

  export type GetScoreRecordAggregateType<T extends ScoreRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateScoreRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScoreRecord[P]>
      : GetScalarType<T[P], AggregateScoreRecord[P]>
  }




  export type ScoreRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScoreRecordWhereInput
    orderBy?: ScoreRecordOrderByWithAggregationInput | ScoreRecordOrderByWithAggregationInput[]
    by: ScoreRecordScalarFieldEnum[] | ScoreRecordScalarFieldEnum
    having?: ScoreRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScoreRecordCountAggregateInputType | true
    _avg?: ScoreRecordAvgAggregateInputType
    _sum?: ScoreRecordSumAggregateInputType
    _min?: ScoreRecordMinAggregateInputType
    _max?: ScoreRecordMaxAggregateInputType
  }

  export type ScoreRecordGroupByOutputType = {
    id: number
    studentId: number
    subjectId: number
    className: string
    type: string
    scoreNumber: number
    scoreText: string
    _count: ScoreRecordCountAggregateOutputType | null
    _avg: ScoreRecordAvgAggregateOutputType | null
    _sum: ScoreRecordSumAggregateOutputType | null
    _min: ScoreRecordMinAggregateOutputType | null
    _max: ScoreRecordMaxAggregateOutputType | null
  }

  type GetScoreRecordGroupByPayload<T extends ScoreRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScoreRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScoreRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScoreRecordGroupByOutputType[P]>
            : GetScalarType<T[P], ScoreRecordGroupByOutputType[P]>
        }
      >
    >


  export type ScoreRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    className?: boolean
    type?: boolean
    scoreNumber?: boolean
    scoreText?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scoreRecord"]>

  export type ScoreRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    className?: boolean
    type?: boolean
    scoreNumber?: boolean
    scoreText?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scoreRecord"]>

  export type ScoreRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    className?: boolean
    type?: boolean
    scoreNumber?: boolean
    scoreText?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scoreRecord"]>

  export type ScoreRecordSelectScalar = {
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    className?: boolean
    type?: boolean
    scoreNumber?: boolean
    scoreText?: boolean
  }

  export type ScoreRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "subjectId" | "className" | "type" | "scoreNumber" | "scoreText", ExtArgs["result"]["scoreRecord"]>
  export type ScoreRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type ScoreRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type ScoreRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $ScoreRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScoreRecord"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      subjectId: number
      className: string
      type: string
      scoreNumber: number
      scoreText: string
    }, ExtArgs["result"]["scoreRecord"]>
    composites: {}
  }

  type ScoreRecordGetPayload<S extends boolean | null | undefined | ScoreRecordDefaultArgs> = $Result.GetResult<Prisma.$ScoreRecordPayload, S>

  type ScoreRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScoreRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScoreRecordCountAggregateInputType | true
    }

  export interface ScoreRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScoreRecord'], meta: { name: 'ScoreRecord' } }
    /**
     * Find zero or one ScoreRecord that matches the filter.
     * @param {ScoreRecordFindUniqueArgs} args - Arguments to find a ScoreRecord
     * @example
     * // Get one ScoreRecord
     * const scoreRecord = await prisma.scoreRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScoreRecordFindUniqueArgs>(args: SelectSubset<T, ScoreRecordFindUniqueArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScoreRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScoreRecordFindUniqueOrThrowArgs} args - Arguments to find a ScoreRecord
     * @example
     * // Get one ScoreRecord
     * const scoreRecord = await prisma.scoreRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScoreRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, ScoreRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScoreRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreRecordFindFirstArgs} args - Arguments to find a ScoreRecord
     * @example
     * // Get one ScoreRecord
     * const scoreRecord = await prisma.scoreRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScoreRecordFindFirstArgs>(args?: SelectSubset<T, ScoreRecordFindFirstArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScoreRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreRecordFindFirstOrThrowArgs} args - Arguments to find a ScoreRecord
     * @example
     * // Get one ScoreRecord
     * const scoreRecord = await prisma.scoreRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScoreRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, ScoreRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScoreRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScoreRecords
     * const scoreRecords = await prisma.scoreRecord.findMany()
     * 
     * // Get first 10 ScoreRecords
     * const scoreRecords = await prisma.scoreRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scoreRecordWithIdOnly = await prisma.scoreRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScoreRecordFindManyArgs>(args?: SelectSubset<T, ScoreRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScoreRecord.
     * @param {ScoreRecordCreateArgs} args - Arguments to create a ScoreRecord.
     * @example
     * // Create one ScoreRecord
     * const ScoreRecord = await prisma.scoreRecord.create({
     *   data: {
     *     // ... data to create a ScoreRecord
     *   }
     * })
     * 
     */
    create<T extends ScoreRecordCreateArgs>(args: SelectSubset<T, ScoreRecordCreateArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScoreRecords.
     * @param {ScoreRecordCreateManyArgs} args - Arguments to create many ScoreRecords.
     * @example
     * // Create many ScoreRecords
     * const scoreRecord = await prisma.scoreRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScoreRecordCreateManyArgs>(args?: SelectSubset<T, ScoreRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScoreRecords and returns the data saved in the database.
     * @param {ScoreRecordCreateManyAndReturnArgs} args - Arguments to create many ScoreRecords.
     * @example
     * // Create many ScoreRecords
     * const scoreRecord = await prisma.scoreRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScoreRecords and only return the `id`
     * const scoreRecordWithIdOnly = await prisma.scoreRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScoreRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, ScoreRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScoreRecord.
     * @param {ScoreRecordDeleteArgs} args - Arguments to delete one ScoreRecord.
     * @example
     * // Delete one ScoreRecord
     * const ScoreRecord = await prisma.scoreRecord.delete({
     *   where: {
     *     // ... filter to delete one ScoreRecord
     *   }
     * })
     * 
     */
    delete<T extends ScoreRecordDeleteArgs>(args: SelectSubset<T, ScoreRecordDeleteArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScoreRecord.
     * @param {ScoreRecordUpdateArgs} args - Arguments to update one ScoreRecord.
     * @example
     * // Update one ScoreRecord
     * const scoreRecord = await prisma.scoreRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScoreRecordUpdateArgs>(args: SelectSubset<T, ScoreRecordUpdateArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScoreRecords.
     * @param {ScoreRecordDeleteManyArgs} args - Arguments to filter ScoreRecords to delete.
     * @example
     * // Delete a few ScoreRecords
     * const { count } = await prisma.scoreRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScoreRecordDeleteManyArgs>(args?: SelectSubset<T, ScoreRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScoreRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScoreRecords
     * const scoreRecord = await prisma.scoreRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScoreRecordUpdateManyArgs>(args: SelectSubset<T, ScoreRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScoreRecords and returns the data updated in the database.
     * @param {ScoreRecordUpdateManyAndReturnArgs} args - Arguments to update many ScoreRecords.
     * @example
     * // Update many ScoreRecords
     * const scoreRecord = await prisma.scoreRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScoreRecords and only return the `id`
     * const scoreRecordWithIdOnly = await prisma.scoreRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScoreRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, ScoreRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScoreRecord.
     * @param {ScoreRecordUpsertArgs} args - Arguments to update or create a ScoreRecord.
     * @example
     * // Update or create a ScoreRecord
     * const scoreRecord = await prisma.scoreRecord.upsert({
     *   create: {
     *     // ... data to create a ScoreRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScoreRecord we want to update
     *   }
     * })
     */
    upsert<T extends ScoreRecordUpsertArgs>(args: SelectSubset<T, ScoreRecordUpsertArgs<ExtArgs>>): Prisma__ScoreRecordClient<$Result.GetResult<Prisma.$ScoreRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScoreRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreRecordCountArgs} args - Arguments to filter ScoreRecords to count.
     * @example
     * // Count the number of ScoreRecords
     * const count = await prisma.scoreRecord.count({
     *   where: {
     *     // ... the filter for the ScoreRecords we want to count
     *   }
     * })
    **/
    count<T extends ScoreRecordCountArgs>(
      args?: Subset<T, ScoreRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScoreRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScoreRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScoreRecordAggregateArgs>(args: Subset<T, ScoreRecordAggregateArgs>): Prisma.PrismaPromise<GetScoreRecordAggregateType<T>>

    /**
     * Group by ScoreRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScoreRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScoreRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScoreRecordGroupByArgs['orderBy'] }
        : { orderBy?: ScoreRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScoreRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScoreRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScoreRecord model
   */
  readonly fields: ScoreRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScoreRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScoreRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScoreRecord model
   */
  interface ScoreRecordFieldRefs {
    readonly id: FieldRef<"ScoreRecord", 'Int'>
    readonly studentId: FieldRef<"ScoreRecord", 'Int'>
    readonly subjectId: FieldRef<"ScoreRecord", 'Int'>
    readonly className: FieldRef<"ScoreRecord", 'String'>
    readonly type: FieldRef<"ScoreRecord", 'String'>
    readonly scoreNumber: FieldRef<"ScoreRecord", 'Int'>
    readonly scoreText: FieldRef<"ScoreRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ScoreRecord findUnique
   */
  export type ScoreRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * Filter, which ScoreRecord to fetch.
     */
    where: ScoreRecordWhereUniqueInput
  }

  /**
   * ScoreRecord findUniqueOrThrow
   */
  export type ScoreRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * Filter, which ScoreRecord to fetch.
     */
    where: ScoreRecordWhereUniqueInput
  }

  /**
   * ScoreRecord findFirst
   */
  export type ScoreRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * Filter, which ScoreRecord to fetch.
     */
    where?: ScoreRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreRecords to fetch.
     */
    orderBy?: ScoreRecordOrderByWithRelationInput | ScoreRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScoreRecords.
     */
    cursor?: ScoreRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScoreRecords.
     */
    distinct?: ScoreRecordScalarFieldEnum | ScoreRecordScalarFieldEnum[]
  }

  /**
   * ScoreRecord findFirstOrThrow
   */
  export type ScoreRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * Filter, which ScoreRecord to fetch.
     */
    where?: ScoreRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreRecords to fetch.
     */
    orderBy?: ScoreRecordOrderByWithRelationInput | ScoreRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScoreRecords.
     */
    cursor?: ScoreRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScoreRecords.
     */
    distinct?: ScoreRecordScalarFieldEnum | ScoreRecordScalarFieldEnum[]
  }

  /**
   * ScoreRecord findMany
   */
  export type ScoreRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * Filter, which ScoreRecords to fetch.
     */
    where?: ScoreRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScoreRecords to fetch.
     */
    orderBy?: ScoreRecordOrderByWithRelationInput | ScoreRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScoreRecords.
     */
    cursor?: ScoreRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScoreRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScoreRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScoreRecords.
     */
    distinct?: ScoreRecordScalarFieldEnum | ScoreRecordScalarFieldEnum[]
  }

  /**
   * ScoreRecord create
   */
  export type ScoreRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a ScoreRecord.
     */
    data: XOR<ScoreRecordCreateInput, ScoreRecordUncheckedCreateInput>
  }

  /**
   * ScoreRecord createMany
   */
  export type ScoreRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScoreRecords.
     */
    data: ScoreRecordCreateManyInput | ScoreRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScoreRecord createManyAndReturn
   */
  export type ScoreRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * The data used to create many ScoreRecords.
     */
    data: ScoreRecordCreateManyInput | ScoreRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScoreRecord update
   */
  export type ScoreRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a ScoreRecord.
     */
    data: XOR<ScoreRecordUpdateInput, ScoreRecordUncheckedUpdateInput>
    /**
     * Choose, which ScoreRecord to update.
     */
    where: ScoreRecordWhereUniqueInput
  }

  /**
   * ScoreRecord updateMany
   */
  export type ScoreRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScoreRecords.
     */
    data: XOR<ScoreRecordUpdateManyMutationInput, ScoreRecordUncheckedUpdateManyInput>
    /**
     * Filter which ScoreRecords to update
     */
    where?: ScoreRecordWhereInput
    /**
     * Limit how many ScoreRecords to update.
     */
    limit?: number
  }

  /**
   * ScoreRecord updateManyAndReturn
   */
  export type ScoreRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * The data used to update ScoreRecords.
     */
    data: XOR<ScoreRecordUpdateManyMutationInput, ScoreRecordUncheckedUpdateManyInput>
    /**
     * Filter which ScoreRecords to update
     */
    where?: ScoreRecordWhereInput
    /**
     * Limit how many ScoreRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScoreRecord upsert
   */
  export type ScoreRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the ScoreRecord to update in case it exists.
     */
    where: ScoreRecordWhereUniqueInput
    /**
     * In case the ScoreRecord found by the `where` argument doesn't exist, create a new ScoreRecord with this data.
     */
    create: XOR<ScoreRecordCreateInput, ScoreRecordUncheckedCreateInput>
    /**
     * In case the ScoreRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScoreRecordUpdateInput, ScoreRecordUncheckedUpdateInput>
  }

  /**
   * ScoreRecord delete
   */
  export type ScoreRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
    /**
     * Filter which ScoreRecord to delete.
     */
    where: ScoreRecordWhereUniqueInput
  }

  /**
   * ScoreRecord deleteMany
   */
  export type ScoreRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScoreRecords to delete
     */
    where?: ScoreRecordWhereInput
    /**
     * Limit how many ScoreRecords to delete.
     */
    limit?: number
  }

  /**
   * ScoreRecord without action
   */
  export type ScoreRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScoreRecord
     */
    select?: ScoreRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScoreRecord
     */
    omit?: ScoreRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScoreRecordInclude<ExtArgs> | null
  }


  /**
   * Model Personality
   */

  export type AggregatePersonality = {
    _count: PersonalityCountAggregateOutputType | null
    _avg: PersonalityAvgAggregateOutputType | null
    _sum: PersonalitySumAggregateOutputType | null
    _min: PersonalityMinAggregateOutputType | null
    _max: PersonalityMaxAggregateOutputType | null
  }

  export type PersonalityAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type PersonalitySumAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type PersonalityMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    className: string | null
    suluk: string | null
    muwadhotah: string | null
    nadzofah: string | null
    indhiplat: string | null
  }

  export type PersonalityMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    className: string | null
    suluk: string | null
    muwadhotah: string | null
    nadzofah: string | null
    indhiplat: string | null
  }

  export type PersonalityCountAggregateOutputType = {
    id: number
    studentId: number
    className: number
    suluk: number
    muwadhotah: number
    nadzofah: number
    indhiplat: number
    _all: number
  }


  export type PersonalityAvgAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type PersonalitySumAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type PersonalityMinAggregateInputType = {
    id?: true
    studentId?: true
    className?: true
    suluk?: true
    muwadhotah?: true
    nadzofah?: true
    indhiplat?: true
  }

  export type PersonalityMaxAggregateInputType = {
    id?: true
    studentId?: true
    className?: true
    suluk?: true
    muwadhotah?: true
    nadzofah?: true
    indhiplat?: true
  }

  export type PersonalityCountAggregateInputType = {
    id?: true
    studentId?: true
    className?: true
    suluk?: true
    muwadhotah?: true
    nadzofah?: true
    indhiplat?: true
    _all?: true
  }

  export type PersonalityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Personality to aggregate.
     */
    where?: PersonalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personalities to fetch.
     */
    orderBy?: PersonalityOrderByWithRelationInput | PersonalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Personalities
    **/
    _count?: true | PersonalityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonalityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonalitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonalityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonalityMaxAggregateInputType
  }

  export type GetPersonalityAggregateType<T extends PersonalityAggregateArgs> = {
        [P in keyof T & keyof AggregatePersonality]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePersonality[P]>
      : GetScalarType<T[P], AggregatePersonality[P]>
  }




  export type PersonalityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonalityWhereInput
    orderBy?: PersonalityOrderByWithAggregationInput | PersonalityOrderByWithAggregationInput[]
    by: PersonalityScalarFieldEnum[] | PersonalityScalarFieldEnum
    having?: PersonalityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonalityCountAggregateInputType | true
    _avg?: PersonalityAvgAggregateInputType
    _sum?: PersonalitySumAggregateInputType
    _min?: PersonalityMinAggregateInputType
    _max?: PersonalityMaxAggregateInputType
  }

  export type PersonalityGroupByOutputType = {
    id: number
    studentId: number
    className: string
    suluk: string
    muwadhotah: string
    nadzofah: string
    indhiplat: string
    _count: PersonalityCountAggregateOutputType | null
    _avg: PersonalityAvgAggregateOutputType | null
    _sum: PersonalitySumAggregateOutputType | null
    _min: PersonalityMinAggregateOutputType | null
    _max: PersonalityMaxAggregateOutputType | null
  }

  type GetPersonalityGroupByPayload<T extends PersonalityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonalityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonalityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonalityGroupByOutputType[P]>
            : GetScalarType<T[P], PersonalityGroupByOutputType[P]>
        }
      >
    >


  export type PersonalitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    className?: boolean
    suluk?: boolean
    muwadhotah?: boolean
    nadzofah?: boolean
    indhiplat?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personality"]>

  export type PersonalitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    className?: boolean
    suluk?: boolean
    muwadhotah?: boolean
    nadzofah?: boolean
    indhiplat?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personality"]>

  export type PersonalitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    className?: boolean
    suluk?: boolean
    muwadhotah?: boolean
    nadzofah?: boolean
    indhiplat?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["personality"]>

  export type PersonalitySelectScalar = {
    id?: boolean
    studentId?: boolean
    className?: boolean
    suluk?: boolean
    muwadhotah?: boolean
    nadzofah?: boolean
    indhiplat?: boolean
  }

  export type PersonalityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "className" | "suluk" | "muwadhotah" | "nadzofah" | "indhiplat", ExtArgs["result"]["personality"]>
  export type PersonalityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type PersonalityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type PersonalityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $PersonalityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Personality"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      className: string
      suluk: string
      muwadhotah: string
      nadzofah: string
      indhiplat: string
    }, ExtArgs["result"]["personality"]>
    composites: {}
  }

  type PersonalityGetPayload<S extends boolean | null | undefined | PersonalityDefaultArgs> = $Result.GetResult<Prisma.$PersonalityPayload, S>

  type PersonalityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonalityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonalityCountAggregateInputType | true
    }

  export interface PersonalityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Personality'], meta: { name: 'Personality' } }
    /**
     * Find zero or one Personality that matches the filter.
     * @param {PersonalityFindUniqueArgs} args - Arguments to find a Personality
     * @example
     * // Get one Personality
     * const personality = await prisma.personality.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonalityFindUniqueArgs>(args: SelectSubset<T, PersonalityFindUniqueArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Personality that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonalityFindUniqueOrThrowArgs} args - Arguments to find a Personality
     * @example
     * // Get one Personality
     * const personality = await prisma.personality.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonalityFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonalityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Personality that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityFindFirstArgs} args - Arguments to find a Personality
     * @example
     * // Get one Personality
     * const personality = await prisma.personality.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonalityFindFirstArgs>(args?: SelectSubset<T, PersonalityFindFirstArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Personality that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityFindFirstOrThrowArgs} args - Arguments to find a Personality
     * @example
     * // Get one Personality
     * const personality = await prisma.personality.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonalityFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonalityFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Personalities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Personalities
     * const personalities = await prisma.personality.findMany()
     * 
     * // Get first 10 Personalities
     * const personalities = await prisma.personality.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personalityWithIdOnly = await prisma.personality.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonalityFindManyArgs>(args?: SelectSubset<T, PersonalityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Personality.
     * @param {PersonalityCreateArgs} args - Arguments to create a Personality.
     * @example
     * // Create one Personality
     * const Personality = await prisma.personality.create({
     *   data: {
     *     // ... data to create a Personality
     *   }
     * })
     * 
     */
    create<T extends PersonalityCreateArgs>(args: SelectSubset<T, PersonalityCreateArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Personalities.
     * @param {PersonalityCreateManyArgs} args - Arguments to create many Personalities.
     * @example
     * // Create many Personalities
     * const personality = await prisma.personality.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonalityCreateManyArgs>(args?: SelectSubset<T, PersonalityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Personalities and returns the data saved in the database.
     * @param {PersonalityCreateManyAndReturnArgs} args - Arguments to create many Personalities.
     * @example
     * // Create many Personalities
     * const personality = await prisma.personality.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Personalities and only return the `id`
     * const personalityWithIdOnly = await prisma.personality.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonalityCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonalityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Personality.
     * @param {PersonalityDeleteArgs} args - Arguments to delete one Personality.
     * @example
     * // Delete one Personality
     * const Personality = await prisma.personality.delete({
     *   where: {
     *     // ... filter to delete one Personality
     *   }
     * })
     * 
     */
    delete<T extends PersonalityDeleteArgs>(args: SelectSubset<T, PersonalityDeleteArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Personality.
     * @param {PersonalityUpdateArgs} args - Arguments to update one Personality.
     * @example
     * // Update one Personality
     * const personality = await prisma.personality.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonalityUpdateArgs>(args: SelectSubset<T, PersonalityUpdateArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Personalities.
     * @param {PersonalityDeleteManyArgs} args - Arguments to filter Personalities to delete.
     * @example
     * // Delete a few Personalities
     * const { count } = await prisma.personality.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonalityDeleteManyArgs>(args?: SelectSubset<T, PersonalityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Personalities
     * const personality = await prisma.personality.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonalityUpdateManyArgs>(args: SelectSubset<T, PersonalityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Personalities and returns the data updated in the database.
     * @param {PersonalityUpdateManyAndReturnArgs} args - Arguments to update many Personalities.
     * @example
     * // Update many Personalities
     * const personality = await prisma.personality.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Personalities and only return the `id`
     * const personalityWithIdOnly = await prisma.personality.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonalityUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonalityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Personality.
     * @param {PersonalityUpsertArgs} args - Arguments to update or create a Personality.
     * @example
     * // Update or create a Personality
     * const personality = await prisma.personality.upsert({
     *   create: {
     *     // ... data to create a Personality
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Personality we want to update
     *   }
     * })
     */
    upsert<T extends PersonalityUpsertArgs>(args: SelectSubset<T, PersonalityUpsertArgs<ExtArgs>>): Prisma__PersonalityClient<$Result.GetResult<Prisma.$PersonalityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Personalities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityCountArgs} args - Arguments to filter Personalities to count.
     * @example
     * // Count the number of Personalities
     * const count = await prisma.personality.count({
     *   where: {
     *     // ... the filter for the Personalities we want to count
     *   }
     * })
    **/
    count<T extends PersonalityCountArgs>(
      args?: Subset<T, PersonalityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonalityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Personality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonalityAggregateArgs>(args: Subset<T, PersonalityAggregateArgs>): Prisma.PrismaPromise<GetPersonalityAggregateType<T>>

    /**
     * Group by Personality.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonalityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonalityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonalityGroupByArgs['orderBy'] }
        : { orderBy?: PersonalityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonalityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonalityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Personality model
   */
  readonly fields: PersonalityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Personality.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonalityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Personality model
   */
  interface PersonalityFieldRefs {
    readonly id: FieldRef<"Personality", 'Int'>
    readonly studentId: FieldRef<"Personality", 'Int'>
    readonly className: FieldRef<"Personality", 'String'>
    readonly suluk: FieldRef<"Personality", 'String'>
    readonly muwadhotah: FieldRef<"Personality", 'String'>
    readonly nadzofah: FieldRef<"Personality", 'String'>
    readonly indhiplat: FieldRef<"Personality", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Personality findUnique
   */
  export type PersonalityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * Filter, which Personality to fetch.
     */
    where: PersonalityWhereUniqueInput
  }

  /**
   * Personality findUniqueOrThrow
   */
  export type PersonalityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * Filter, which Personality to fetch.
     */
    where: PersonalityWhereUniqueInput
  }

  /**
   * Personality findFirst
   */
  export type PersonalityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * Filter, which Personality to fetch.
     */
    where?: PersonalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personalities to fetch.
     */
    orderBy?: PersonalityOrderByWithRelationInput | PersonalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personalities.
     */
    cursor?: PersonalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personalities.
     */
    distinct?: PersonalityScalarFieldEnum | PersonalityScalarFieldEnum[]
  }

  /**
   * Personality findFirstOrThrow
   */
  export type PersonalityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * Filter, which Personality to fetch.
     */
    where?: PersonalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personalities to fetch.
     */
    orderBy?: PersonalityOrderByWithRelationInput | PersonalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Personalities.
     */
    cursor?: PersonalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personalities.
     */
    distinct?: PersonalityScalarFieldEnum | PersonalityScalarFieldEnum[]
  }

  /**
   * Personality findMany
   */
  export type PersonalityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * Filter, which Personalities to fetch.
     */
    where?: PersonalityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Personalities to fetch.
     */
    orderBy?: PersonalityOrderByWithRelationInput | PersonalityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Personalities.
     */
    cursor?: PersonalityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Personalities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Personalities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Personalities.
     */
    distinct?: PersonalityScalarFieldEnum | PersonalityScalarFieldEnum[]
  }

  /**
   * Personality create
   */
  export type PersonalityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * The data needed to create a Personality.
     */
    data: XOR<PersonalityCreateInput, PersonalityUncheckedCreateInput>
  }

  /**
   * Personality createMany
   */
  export type PersonalityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Personalities.
     */
    data: PersonalityCreateManyInput | PersonalityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Personality createManyAndReturn
   */
  export type PersonalityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * The data used to create many Personalities.
     */
    data: PersonalityCreateManyInput | PersonalityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Personality update
   */
  export type PersonalityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * The data needed to update a Personality.
     */
    data: XOR<PersonalityUpdateInput, PersonalityUncheckedUpdateInput>
    /**
     * Choose, which Personality to update.
     */
    where: PersonalityWhereUniqueInput
  }

  /**
   * Personality updateMany
   */
  export type PersonalityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Personalities.
     */
    data: XOR<PersonalityUpdateManyMutationInput, PersonalityUncheckedUpdateManyInput>
    /**
     * Filter which Personalities to update
     */
    where?: PersonalityWhereInput
    /**
     * Limit how many Personalities to update.
     */
    limit?: number
  }

  /**
   * Personality updateManyAndReturn
   */
  export type PersonalityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * The data used to update Personalities.
     */
    data: XOR<PersonalityUpdateManyMutationInput, PersonalityUncheckedUpdateManyInput>
    /**
     * Filter which Personalities to update
     */
    where?: PersonalityWhereInput
    /**
     * Limit how many Personalities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Personality upsert
   */
  export type PersonalityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * The filter to search for the Personality to update in case it exists.
     */
    where: PersonalityWhereUniqueInput
    /**
     * In case the Personality found by the `where` argument doesn't exist, create a new Personality with this data.
     */
    create: XOR<PersonalityCreateInput, PersonalityUncheckedCreateInput>
    /**
     * In case the Personality was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonalityUpdateInput, PersonalityUncheckedUpdateInput>
  }

  /**
   * Personality delete
   */
  export type PersonalityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
    /**
     * Filter which Personality to delete.
     */
    where: PersonalityWhereUniqueInput
  }

  /**
   * Personality deleteMany
   */
  export type PersonalityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Personalities to delete
     */
    where?: PersonalityWhereInput
    /**
     * Limit how many Personalities to delete.
     */
    limit?: number
  }

  /**
   * Personality without action
   */
  export type PersonalityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Personality
     */
    select?: PersonalitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Personality
     */
    omit?: PersonalityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonalityInclude<ExtArgs> | null
  }


  /**
   * Model HomeroomNote
   */

  export type AggregateHomeroomNote = {
    _count: HomeroomNoteCountAggregateOutputType | null
    _avg: HomeroomNoteAvgAggregateOutputType | null
    _sum: HomeroomNoteSumAggregateOutputType | null
    _min: HomeroomNoteMinAggregateOutputType | null
    _max: HomeroomNoteMaxAggregateOutputType | null
  }

  export type HomeroomNoteAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type HomeroomNoteSumAggregateOutputType = {
    id: number | null
    studentId: number | null
  }

  export type HomeroomNoteMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    className: string | null
    note: string | null
    updatedAt: Date | null
  }

  export type HomeroomNoteMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    className: string | null
    note: string | null
    updatedAt: Date | null
  }

  export type HomeroomNoteCountAggregateOutputType = {
    id: number
    studentId: number
    className: number
    note: number
    updatedAt: number
    _all: number
  }


  export type HomeroomNoteAvgAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type HomeroomNoteSumAggregateInputType = {
    id?: true
    studentId?: true
  }

  export type HomeroomNoteMinAggregateInputType = {
    id?: true
    studentId?: true
    className?: true
    note?: true
    updatedAt?: true
  }

  export type HomeroomNoteMaxAggregateInputType = {
    id?: true
    studentId?: true
    className?: true
    note?: true
    updatedAt?: true
  }

  export type HomeroomNoteCountAggregateInputType = {
    id?: true
    studentId?: true
    className?: true
    note?: true
    updatedAt?: true
    _all?: true
  }

  export type HomeroomNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HomeroomNote to aggregate.
     */
    where?: HomeroomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeroomNotes to fetch.
     */
    orderBy?: HomeroomNoteOrderByWithRelationInput | HomeroomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HomeroomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeroomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeroomNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HomeroomNotes
    **/
    _count?: true | HomeroomNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HomeroomNoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HomeroomNoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HomeroomNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HomeroomNoteMaxAggregateInputType
  }

  export type GetHomeroomNoteAggregateType<T extends HomeroomNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateHomeroomNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHomeroomNote[P]>
      : GetScalarType<T[P], AggregateHomeroomNote[P]>
  }




  export type HomeroomNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HomeroomNoteWhereInput
    orderBy?: HomeroomNoteOrderByWithAggregationInput | HomeroomNoteOrderByWithAggregationInput[]
    by: HomeroomNoteScalarFieldEnum[] | HomeroomNoteScalarFieldEnum
    having?: HomeroomNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HomeroomNoteCountAggregateInputType | true
    _avg?: HomeroomNoteAvgAggregateInputType
    _sum?: HomeroomNoteSumAggregateInputType
    _min?: HomeroomNoteMinAggregateInputType
    _max?: HomeroomNoteMaxAggregateInputType
  }

  export type HomeroomNoteGroupByOutputType = {
    id: number
    studentId: number
    className: string
    note: string
    updatedAt: Date
    _count: HomeroomNoteCountAggregateOutputType | null
    _avg: HomeroomNoteAvgAggregateOutputType | null
    _sum: HomeroomNoteSumAggregateOutputType | null
    _min: HomeroomNoteMinAggregateOutputType | null
    _max: HomeroomNoteMaxAggregateOutputType | null
  }

  type GetHomeroomNoteGroupByPayload<T extends HomeroomNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HomeroomNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HomeroomNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HomeroomNoteGroupByOutputType[P]>
            : GetScalarType<T[P], HomeroomNoteGroupByOutputType[P]>
        }
      >
    >


  export type HomeroomNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    className?: boolean
    note?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["homeroomNote"]>

  export type HomeroomNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    className?: boolean
    note?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["homeroomNote"]>

  export type HomeroomNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    className?: boolean
    note?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["homeroomNote"]>

  export type HomeroomNoteSelectScalar = {
    id?: boolean
    studentId?: boolean
    className?: boolean
    note?: boolean
    updatedAt?: boolean
  }

  export type HomeroomNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "className" | "note" | "updatedAt", ExtArgs["result"]["homeroomNote"]>
  export type HomeroomNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type HomeroomNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type HomeroomNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $HomeroomNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HomeroomNote"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      className: string
      note: string
      updatedAt: Date
    }, ExtArgs["result"]["homeroomNote"]>
    composites: {}
  }

  type HomeroomNoteGetPayload<S extends boolean | null | undefined | HomeroomNoteDefaultArgs> = $Result.GetResult<Prisma.$HomeroomNotePayload, S>

  type HomeroomNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HomeroomNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HomeroomNoteCountAggregateInputType | true
    }

  export interface HomeroomNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HomeroomNote'], meta: { name: 'HomeroomNote' } }
    /**
     * Find zero or one HomeroomNote that matches the filter.
     * @param {HomeroomNoteFindUniqueArgs} args - Arguments to find a HomeroomNote
     * @example
     * // Get one HomeroomNote
     * const homeroomNote = await prisma.homeroomNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HomeroomNoteFindUniqueArgs>(args: SelectSubset<T, HomeroomNoteFindUniqueArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HomeroomNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HomeroomNoteFindUniqueOrThrowArgs} args - Arguments to find a HomeroomNote
     * @example
     * // Get one HomeroomNote
     * const homeroomNote = await prisma.homeroomNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HomeroomNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, HomeroomNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HomeroomNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeroomNoteFindFirstArgs} args - Arguments to find a HomeroomNote
     * @example
     * // Get one HomeroomNote
     * const homeroomNote = await prisma.homeroomNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HomeroomNoteFindFirstArgs>(args?: SelectSubset<T, HomeroomNoteFindFirstArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HomeroomNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeroomNoteFindFirstOrThrowArgs} args - Arguments to find a HomeroomNote
     * @example
     * // Get one HomeroomNote
     * const homeroomNote = await prisma.homeroomNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HomeroomNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, HomeroomNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HomeroomNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeroomNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HomeroomNotes
     * const homeroomNotes = await prisma.homeroomNote.findMany()
     * 
     * // Get first 10 HomeroomNotes
     * const homeroomNotes = await prisma.homeroomNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const homeroomNoteWithIdOnly = await prisma.homeroomNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HomeroomNoteFindManyArgs>(args?: SelectSubset<T, HomeroomNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HomeroomNote.
     * @param {HomeroomNoteCreateArgs} args - Arguments to create a HomeroomNote.
     * @example
     * // Create one HomeroomNote
     * const HomeroomNote = await prisma.homeroomNote.create({
     *   data: {
     *     // ... data to create a HomeroomNote
     *   }
     * })
     * 
     */
    create<T extends HomeroomNoteCreateArgs>(args: SelectSubset<T, HomeroomNoteCreateArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HomeroomNotes.
     * @param {HomeroomNoteCreateManyArgs} args - Arguments to create many HomeroomNotes.
     * @example
     * // Create many HomeroomNotes
     * const homeroomNote = await prisma.homeroomNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HomeroomNoteCreateManyArgs>(args?: SelectSubset<T, HomeroomNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HomeroomNotes and returns the data saved in the database.
     * @param {HomeroomNoteCreateManyAndReturnArgs} args - Arguments to create many HomeroomNotes.
     * @example
     * // Create many HomeroomNotes
     * const homeroomNote = await prisma.homeroomNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HomeroomNotes and only return the `id`
     * const homeroomNoteWithIdOnly = await prisma.homeroomNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HomeroomNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, HomeroomNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HomeroomNote.
     * @param {HomeroomNoteDeleteArgs} args - Arguments to delete one HomeroomNote.
     * @example
     * // Delete one HomeroomNote
     * const HomeroomNote = await prisma.homeroomNote.delete({
     *   where: {
     *     // ... filter to delete one HomeroomNote
     *   }
     * })
     * 
     */
    delete<T extends HomeroomNoteDeleteArgs>(args: SelectSubset<T, HomeroomNoteDeleteArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HomeroomNote.
     * @param {HomeroomNoteUpdateArgs} args - Arguments to update one HomeroomNote.
     * @example
     * // Update one HomeroomNote
     * const homeroomNote = await prisma.homeroomNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HomeroomNoteUpdateArgs>(args: SelectSubset<T, HomeroomNoteUpdateArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HomeroomNotes.
     * @param {HomeroomNoteDeleteManyArgs} args - Arguments to filter HomeroomNotes to delete.
     * @example
     * // Delete a few HomeroomNotes
     * const { count } = await prisma.homeroomNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HomeroomNoteDeleteManyArgs>(args?: SelectSubset<T, HomeroomNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HomeroomNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeroomNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HomeroomNotes
     * const homeroomNote = await prisma.homeroomNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HomeroomNoteUpdateManyArgs>(args: SelectSubset<T, HomeroomNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HomeroomNotes and returns the data updated in the database.
     * @param {HomeroomNoteUpdateManyAndReturnArgs} args - Arguments to update many HomeroomNotes.
     * @example
     * // Update many HomeroomNotes
     * const homeroomNote = await prisma.homeroomNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HomeroomNotes and only return the `id`
     * const homeroomNoteWithIdOnly = await prisma.homeroomNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HomeroomNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, HomeroomNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HomeroomNote.
     * @param {HomeroomNoteUpsertArgs} args - Arguments to update or create a HomeroomNote.
     * @example
     * // Update or create a HomeroomNote
     * const homeroomNote = await prisma.homeroomNote.upsert({
     *   create: {
     *     // ... data to create a HomeroomNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HomeroomNote we want to update
     *   }
     * })
     */
    upsert<T extends HomeroomNoteUpsertArgs>(args: SelectSubset<T, HomeroomNoteUpsertArgs<ExtArgs>>): Prisma__HomeroomNoteClient<$Result.GetResult<Prisma.$HomeroomNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HomeroomNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeroomNoteCountArgs} args - Arguments to filter HomeroomNotes to count.
     * @example
     * // Count the number of HomeroomNotes
     * const count = await prisma.homeroomNote.count({
     *   where: {
     *     // ... the filter for the HomeroomNotes we want to count
     *   }
     * })
    **/
    count<T extends HomeroomNoteCountArgs>(
      args?: Subset<T, HomeroomNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HomeroomNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HomeroomNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeroomNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HomeroomNoteAggregateArgs>(args: Subset<T, HomeroomNoteAggregateArgs>): Prisma.PrismaPromise<GetHomeroomNoteAggregateType<T>>

    /**
     * Group by HomeroomNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HomeroomNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HomeroomNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HomeroomNoteGroupByArgs['orderBy'] }
        : { orderBy?: HomeroomNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HomeroomNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHomeroomNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HomeroomNote model
   */
  readonly fields: HomeroomNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HomeroomNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HomeroomNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HomeroomNote model
   */
  interface HomeroomNoteFieldRefs {
    readonly id: FieldRef<"HomeroomNote", 'Int'>
    readonly studentId: FieldRef<"HomeroomNote", 'Int'>
    readonly className: FieldRef<"HomeroomNote", 'String'>
    readonly note: FieldRef<"HomeroomNote", 'String'>
    readonly updatedAt: FieldRef<"HomeroomNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HomeroomNote findUnique
   */
  export type HomeroomNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * Filter, which HomeroomNote to fetch.
     */
    where: HomeroomNoteWhereUniqueInput
  }

  /**
   * HomeroomNote findUniqueOrThrow
   */
  export type HomeroomNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * Filter, which HomeroomNote to fetch.
     */
    where: HomeroomNoteWhereUniqueInput
  }

  /**
   * HomeroomNote findFirst
   */
  export type HomeroomNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * Filter, which HomeroomNote to fetch.
     */
    where?: HomeroomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeroomNotes to fetch.
     */
    orderBy?: HomeroomNoteOrderByWithRelationInput | HomeroomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HomeroomNotes.
     */
    cursor?: HomeroomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeroomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeroomNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HomeroomNotes.
     */
    distinct?: HomeroomNoteScalarFieldEnum | HomeroomNoteScalarFieldEnum[]
  }

  /**
   * HomeroomNote findFirstOrThrow
   */
  export type HomeroomNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * Filter, which HomeroomNote to fetch.
     */
    where?: HomeroomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeroomNotes to fetch.
     */
    orderBy?: HomeroomNoteOrderByWithRelationInput | HomeroomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HomeroomNotes.
     */
    cursor?: HomeroomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeroomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeroomNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HomeroomNotes.
     */
    distinct?: HomeroomNoteScalarFieldEnum | HomeroomNoteScalarFieldEnum[]
  }

  /**
   * HomeroomNote findMany
   */
  export type HomeroomNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * Filter, which HomeroomNotes to fetch.
     */
    where?: HomeroomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HomeroomNotes to fetch.
     */
    orderBy?: HomeroomNoteOrderByWithRelationInput | HomeroomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HomeroomNotes.
     */
    cursor?: HomeroomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HomeroomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HomeroomNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HomeroomNotes.
     */
    distinct?: HomeroomNoteScalarFieldEnum | HomeroomNoteScalarFieldEnum[]
  }

  /**
   * HomeroomNote create
   */
  export type HomeroomNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a HomeroomNote.
     */
    data: XOR<HomeroomNoteCreateInput, HomeroomNoteUncheckedCreateInput>
  }

  /**
   * HomeroomNote createMany
   */
  export type HomeroomNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HomeroomNotes.
     */
    data: HomeroomNoteCreateManyInput | HomeroomNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HomeroomNote createManyAndReturn
   */
  export type HomeroomNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * The data used to create many HomeroomNotes.
     */
    data: HomeroomNoteCreateManyInput | HomeroomNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HomeroomNote update
   */
  export type HomeroomNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a HomeroomNote.
     */
    data: XOR<HomeroomNoteUpdateInput, HomeroomNoteUncheckedUpdateInput>
    /**
     * Choose, which HomeroomNote to update.
     */
    where: HomeroomNoteWhereUniqueInput
  }

  /**
   * HomeroomNote updateMany
   */
  export type HomeroomNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HomeroomNotes.
     */
    data: XOR<HomeroomNoteUpdateManyMutationInput, HomeroomNoteUncheckedUpdateManyInput>
    /**
     * Filter which HomeroomNotes to update
     */
    where?: HomeroomNoteWhereInput
    /**
     * Limit how many HomeroomNotes to update.
     */
    limit?: number
  }

  /**
   * HomeroomNote updateManyAndReturn
   */
  export type HomeroomNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * The data used to update HomeroomNotes.
     */
    data: XOR<HomeroomNoteUpdateManyMutationInput, HomeroomNoteUncheckedUpdateManyInput>
    /**
     * Filter which HomeroomNotes to update
     */
    where?: HomeroomNoteWhereInput
    /**
     * Limit how many HomeroomNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HomeroomNote upsert
   */
  export type HomeroomNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the HomeroomNote to update in case it exists.
     */
    where: HomeroomNoteWhereUniqueInput
    /**
     * In case the HomeroomNote found by the `where` argument doesn't exist, create a new HomeroomNote with this data.
     */
    create: XOR<HomeroomNoteCreateInput, HomeroomNoteUncheckedCreateInput>
    /**
     * In case the HomeroomNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HomeroomNoteUpdateInput, HomeroomNoteUncheckedUpdateInput>
  }

  /**
   * HomeroomNote delete
   */
  export type HomeroomNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
    /**
     * Filter which HomeroomNote to delete.
     */
    where: HomeroomNoteWhereUniqueInput
  }

  /**
   * HomeroomNote deleteMany
   */
  export type HomeroomNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HomeroomNotes to delete
     */
    where?: HomeroomNoteWhereInput
    /**
     * Limit how many HomeroomNotes to delete.
     */
    limit?: number
  }

  /**
   * HomeroomNote without action
   */
  export type HomeroomNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HomeroomNote
     */
    select?: HomeroomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HomeroomNote
     */
    omit?: HomeroomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HomeroomNoteInclude<ExtArgs> | null
  }


  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null
    _avg: SystemSettingAvgAggregateOutputType | null
    _sum: SystemSettingSumAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  export type SystemSettingAvgAggregateOutputType = {
    id: number | null
  }

  export type SystemSettingSumAggregateOutputType = {
    id: number | null
  }

  export type SystemSettingMinAggregateOutputType = {
    id: number | null
    schoolName: string | null
    academicYear: string | null
    semester: string | null
    principalName: string | null
    updatedAt: Date | null
  }

  export type SystemSettingMaxAggregateOutputType = {
    id: number | null
    schoolName: string | null
    academicYear: string | null
    semester: string | null
    principalName: string | null
    updatedAt: Date | null
  }

  export type SystemSettingCountAggregateOutputType = {
    id: number
    schoolName: number
    academicYear: number
    semester: number
    principalName: number
    updatedAt: number
    _all: number
  }


  export type SystemSettingAvgAggregateInputType = {
    id?: true
  }

  export type SystemSettingSumAggregateInputType = {
    id?: true
  }

  export type SystemSettingMinAggregateInputType = {
    id?: true
    schoolName?: true
    academicYear?: true
    semester?: true
    principalName?: true
    updatedAt?: true
  }

  export type SystemSettingMaxAggregateInputType = {
    id?: true
    schoolName?: true
    academicYear?: true
    semester?: true
    principalName?: true
    updatedAt?: true
  }

  export type SystemSettingCountAggregateInputType = {
    id?: true
    schoolName?: true
    academicYear?: true
    semester?: true
    principalName?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SystemSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SystemSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingMaxAggregateInputType
  }

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>
  }




  export type SystemSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingWhereInput
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[]
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum
    having?: SystemSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingCountAggregateInputType | true
    _avg?: SystemSettingAvgAggregateInputType
    _sum?: SystemSettingSumAggregateInputType
    _min?: SystemSettingMinAggregateInputType
    _max?: SystemSettingMaxAggregateInputType
  }

  export type SystemSettingGroupByOutputType = {
    id: number
    schoolName: string
    academicYear: string
    semester: string
    principalName: string
    updatedAt: Date
    _count: SystemSettingCountAggregateOutputType | null
    _avg: SystemSettingAvgAggregateOutputType | null
    _sum: SystemSettingSumAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    academicYear?: boolean
    semester?: boolean
    principalName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    academicYear?: boolean
    semester?: boolean
    principalName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolName?: boolean
    academicYear?: boolean
    semester?: boolean
    principalName?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectScalar = {
    id?: boolean
    schoolName?: boolean
    academicYear?: boolean
    semester?: boolean
    principalName?: boolean
    updatedAt?: boolean
  }

  export type SystemSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolName" | "academicYear" | "semester" | "principalName" | "updatedAt", ExtArgs["result"]["systemSetting"]>

  export type $SystemSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      schoolName: string
      academicYear: string
      semester: string
      principalName: string
      updatedAt: Date
    }, ExtArgs["result"]["systemSetting"]>
    composites: {}
  }

  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingPayload, S>

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemSettingCountAggregateInputType | true
    }

  export interface SystemSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'], meta: { name: 'SystemSetting' } }
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemSettingFindUniqueArgs>(args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemSettingFindFirstArgs>(args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemSettingFindManyArgs>(args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     * 
     */
    create<T extends SystemSettingCreateArgs>(args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemSettings.
     * @param {SystemSettingCreateManyArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemSettingCreateManyArgs>(args?: SelectSubset<T, SystemSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemSettings and returns the data saved in the database.
     * @param {SystemSettingCreateManyAndReturnArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     * 
     */
    delete<T extends SystemSettingDeleteArgs>(args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemSettingUpdateArgs>(args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemSettingDeleteManyArgs>(args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemSettingUpdateManyArgs>(args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings and returns the data updated in the database.
     * @param {SystemSettingUpdateManyAndReturnArgs} args - Arguments to update many SystemSettings.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
     */
    upsert<T extends SystemSettingUpsertArgs>(args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingAggregateArgs>(args: Subset<T, SystemSettingAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSetting model
   */
  readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemSetting model
   */
  interface SystemSettingFieldRefs {
    readonly id: FieldRef<"SystemSetting", 'Int'>
    readonly schoolName: FieldRef<"SystemSetting", 'String'>
    readonly academicYear: FieldRef<"SystemSetting", 'String'>
    readonly semester: FieldRef<"SystemSetting", 'String'>
    readonly principalName: FieldRef<"SystemSetting", 'String'>
    readonly updatedAt: FieldRef<"SystemSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
  }

  /**
   * SystemSetting createMany
   */
  export type SystemSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting createManyAndReturn
   */
  export type SystemSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSetting updateManyAndReturn
   */
  export type SystemSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to update.
     */
    limit?: number
  }

  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
  }

  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput
    /**
     * Limit how many SystemSettings to delete.
     */
    limit?: number
  }

  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemSetting
     */
    omit?: SystemSettingOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    identity_number: 'identity_number',
    password: 'password',
    fullname: 'fullname',
    birth_date: 'birth_date',
    education: 'education',
    address: 'address',
    role: 'role'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    teacherId: 'teacherId'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const CPScalarFieldEnum: {
    id: 'id',
    code: 'code',
    description: 'description',
    subjectId: 'subjectId'
  };

  export type CPScalarFieldEnum = (typeof CPScalarFieldEnum)[keyof typeof CPScalarFieldEnum]


  export const TPScalarFieldEnum: {
    id: 'id',
    code: 'code',
    description: 'description',
    cpId: 'cpId'
  };

  export type TPScalarFieldEnum = (typeof TPScalarFieldEnum)[keyof typeof TPScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    nisn: 'nisn',
    fullname: 'fullname',
    birth_info: 'birth_info',
    gender: 'gender',
    class_name: 'class_name',
    address: 'address'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const AssessmentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    tpId: 'tpId',
    score: 'score',
    type: 'type'
  };

  export type AssessmentScalarFieldEnum = (typeof AssessmentScalarFieldEnum)[keyof typeof AssessmentScalarFieldEnum]


  export const TahfidzScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    juz: 'juz',
    surah: 'surah',
    ayat: 'ayat',
    predicate: 'predicate',
    date: 'date'
  };

  export type TahfidzScalarFieldEnum = (typeof TahfidzScalarFieldEnum)[keyof typeof TahfidzScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    status: 'status',
    date: 'date'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const ClassRoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    level: 'level',
    grade: 'grade',
    status: 'status'
  };

  export type ClassRoomScalarFieldEnum = (typeof ClassRoomScalarFieldEnum)[keyof typeof ClassRoomScalarFieldEnum]


  export const AssignmentScalarFieldEnum: {
    id: 'id',
    teacherId: 'teacherId',
    subjectId: 'subjectId',
    className: 'className',
    academicYear: 'academicYear'
  };

  export type AssignmentScalarFieldEnum = (typeof AssignmentScalarFieldEnum)[keyof typeof AssignmentScalarFieldEnum]


  export const ScoreRecordScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    subjectId: 'subjectId',
    className: 'className',
    type: 'type',
    scoreNumber: 'scoreNumber',
    scoreText: 'scoreText'
  };

  export type ScoreRecordScalarFieldEnum = (typeof ScoreRecordScalarFieldEnum)[keyof typeof ScoreRecordScalarFieldEnum]


  export const PersonalityScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    className: 'className',
    suluk: 'suluk',
    muwadhotah: 'muwadhotah',
    nadzofah: 'nadzofah',
    indhiplat: 'indhiplat'
  };

  export type PersonalityScalarFieldEnum = (typeof PersonalityScalarFieldEnum)[keyof typeof PersonalityScalarFieldEnum]


  export const HomeroomNoteScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    className: 'className',
    note: 'note',
    updatedAt: 'updatedAt'
  };

  export type HomeroomNoteScalarFieldEnum = (typeof HomeroomNoteScalarFieldEnum)[keyof typeof HomeroomNoteScalarFieldEnum]


  export const SystemSettingScalarFieldEnum: {
    id: 'id',
    schoolName: 'schoolName',
    academicYear: 'academicYear',
    semester: 'semester',
    principalName: 'principalName',
    updatedAt: 'updatedAt'
  };

  export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: IntFilter<"Teacher"> | number
    identity_number?: StringFilter<"Teacher"> | string
    password?: StringFilter<"Teacher"> | string
    fullname?: StringFilter<"Teacher"> | string
    birth_date?: StringNullableFilter<"Teacher"> | string | null
    education?: StringNullableFilter<"Teacher"> | string | null
    address?: StringNullableFilter<"Teacher"> | string | null
    role?: StringFilter<"Teacher"> | string
    assignments?: AssignmentListRelationFilter
    subjects?: SubjectListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    identity_number?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    birth_date?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    role?: SortOrder
    assignments?: AssignmentOrderByRelationAggregateInput
    subjects?: SubjectOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    identity_number?: string
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    password?: StringFilter<"Teacher"> | string
    fullname?: StringFilter<"Teacher"> | string
    birth_date?: StringNullableFilter<"Teacher"> | string | null
    education?: StringNullableFilter<"Teacher"> | string | null
    address?: StringNullableFilter<"Teacher"> | string | null
    role?: StringFilter<"Teacher"> | string
    assignments?: AssignmentListRelationFilter
    subjects?: SubjectListRelationFilter
  }, "id" | "identity_number">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    identity_number?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    birth_date?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    role?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Teacher"> | number
    identity_number?: StringWithAggregatesFilter<"Teacher"> | string
    password?: StringWithAggregatesFilter<"Teacher"> | string
    fullname?: StringWithAggregatesFilter<"Teacher"> | string
    birth_date?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    education?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    address?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    role?: StringWithAggregatesFilter<"Teacher"> | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: IntFilter<"Subject"> | number
    name?: StringFilter<"Subject"> | string
    teacherId?: IntFilter<"Subject"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    assignments?: AssignmentListRelationFilter
    cps?: CPListRelationFilter
    scoreRecords?: ScoreRecordListRelationFilter
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    assignments?: AssignmentOrderByRelationAggregateInput
    cps?: CPOrderByRelationAggregateInput
    scoreRecords?: ScoreRecordOrderByRelationAggregateInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    name?: StringFilter<"Subject"> | string
    teacherId?: IntFilter<"Subject"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    assignments?: AssignmentListRelationFilter
    cps?: CPListRelationFilter
    scoreRecords?: ScoreRecordListRelationFilter
  }, "id">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _avg?: SubjectAvgOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
    _sum?: SubjectSumOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subject"> | number
    name?: StringWithAggregatesFilter<"Subject"> | string
    teacherId?: IntWithAggregatesFilter<"Subject"> | number
  }

  export type CPWhereInput = {
    AND?: CPWhereInput | CPWhereInput[]
    OR?: CPWhereInput[]
    NOT?: CPWhereInput | CPWhereInput[]
    id?: IntFilter<"CP"> | number
    code?: StringFilter<"CP"> | string
    description?: StringFilter<"CP"> | string
    subjectId?: IntFilter<"CP"> | number
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    tps?: TPListRelationFilter
  }

  export type CPOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    subjectId?: SortOrder
    subject?: SubjectOrderByWithRelationInput
    tps?: TPOrderByRelationAggregateInput
  }

  export type CPWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CPWhereInput | CPWhereInput[]
    OR?: CPWhereInput[]
    NOT?: CPWhereInput | CPWhereInput[]
    code?: StringFilter<"CP"> | string
    description?: StringFilter<"CP"> | string
    subjectId?: IntFilter<"CP"> | number
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    tps?: TPListRelationFilter
  }, "id">

  export type CPOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    subjectId?: SortOrder
    _count?: CPCountOrderByAggregateInput
    _avg?: CPAvgOrderByAggregateInput
    _max?: CPMaxOrderByAggregateInput
    _min?: CPMinOrderByAggregateInput
    _sum?: CPSumOrderByAggregateInput
  }

  export type CPScalarWhereWithAggregatesInput = {
    AND?: CPScalarWhereWithAggregatesInput | CPScalarWhereWithAggregatesInput[]
    OR?: CPScalarWhereWithAggregatesInput[]
    NOT?: CPScalarWhereWithAggregatesInput | CPScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CP"> | number
    code?: StringWithAggregatesFilter<"CP"> | string
    description?: StringWithAggregatesFilter<"CP"> | string
    subjectId?: IntWithAggregatesFilter<"CP"> | number
  }

  export type TPWhereInput = {
    AND?: TPWhereInput | TPWhereInput[]
    OR?: TPWhereInput[]
    NOT?: TPWhereInput | TPWhereInput[]
    id?: IntFilter<"TP"> | number
    code?: StringFilter<"TP"> | string
    description?: StringFilter<"TP"> | string
    cpId?: IntFilter<"TP"> | number
    cp?: XOR<CPScalarRelationFilter, CPWhereInput>
    assessments?: AssessmentListRelationFilter
  }

  export type TPOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    cpId?: SortOrder
    cp?: CPOrderByWithRelationInput
    assessments?: AssessmentOrderByRelationAggregateInput
  }

  export type TPWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TPWhereInput | TPWhereInput[]
    OR?: TPWhereInput[]
    NOT?: TPWhereInput | TPWhereInput[]
    code?: StringFilter<"TP"> | string
    description?: StringFilter<"TP"> | string
    cpId?: IntFilter<"TP"> | number
    cp?: XOR<CPScalarRelationFilter, CPWhereInput>
    assessments?: AssessmentListRelationFilter
  }, "id">

  export type TPOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    cpId?: SortOrder
    _count?: TPCountOrderByAggregateInput
    _avg?: TPAvgOrderByAggregateInput
    _max?: TPMaxOrderByAggregateInput
    _min?: TPMinOrderByAggregateInput
    _sum?: TPSumOrderByAggregateInput
  }

  export type TPScalarWhereWithAggregatesInput = {
    AND?: TPScalarWhereWithAggregatesInput | TPScalarWhereWithAggregatesInput[]
    OR?: TPScalarWhereWithAggregatesInput[]
    NOT?: TPScalarWhereWithAggregatesInput | TPScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TP"> | number
    code?: StringWithAggregatesFilter<"TP"> | string
    description?: StringWithAggregatesFilter<"TP"> | string
    cpId?: IntWithAggregatesFilter<"TP"> | number
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    nisn?: StringFilter<"Student"> | string
    fullname?: StringFilter<"Student"> | string
    birth_info?: StringNullableFilter<"Student"> | string | null
    gender?: StringFilter<"Student"> | string
    class_name?: StringFilter<"Student"> | string
    address?: StringNullableFilter<"Student"> | string | null
    assessments?: AssessmentListRelationFilter
    attendances?: AttendanceListRelationFilter
    homeroomNote?: XOR<HomeroomNoteNullableScalarRelationFilter, HomeroomNoteWhereInput> | null
    personality?: XOR<PersonalityNullableScalarRelationFilter, PersonalityWhereInput> | null
    scoreRecords?: ScoreRecordListRelationFilter
    tahfidzs?: TahfidzListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    nisn?: SortOrder
    fullname?: SortOrder
    birth_info?: SortOrderInput | SortOrder
    gender?: SortOrder
    class_name?: SortOrder
    address?: SortOrderInput | SortOrder
    assessments?: AssessmentOrderByRelationAggregateInput
    attendances?: AttendanceOrderByRelationAggregateInput
    homeroomNote?: HomeroomNoteOrderByWithRelationInput
    personality?: PersonalityOrderByWithRelationInput
    scoreRecords?: ScoreRecordOrderByRelationAggregateInput
    tahfidzs?: TahfidzOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nisn?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    fullname?: StringFilter<"Student"> | string
    birth_info?: StringNullableFilter<"Student"> | string | null
    gender?: StringFilter<"Student"> | string
    class_name?: StringFilter<"Student"> | string
    address?: StringNullableFilter<"Student"> | string | null
    assessments?: AssessmentListRelationFilter
    attendances?: AttendanceListRelationFilter
    homeroomNote?: XOR<HomeroomNoteNullableScalarRelationFilter, HomeroomNoteWhereInput> | null
    personality?: XOR<PersonalityNullableScalarRelationFilter, PersonalityWhereInput> | null
    scoreRecords?: ScoreRecordListRelationFilter
    tahfidzs?: TahfidzListRelationFilter
  }, "id" | "nisn">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    nisn?: SortOrder
    fullname?: SortOrder
    birth_info?: SortOrderInput | SortOrder
    gender?: SortOrder
    class_name?: SortOrder
    address?: SortOrderInput | SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    nisn?: StringWithAggregatesFilter<"Student"> | string
    fullname?: StringWithAggregatesFilter<"Student"> | string
    birth_info?: StringNullableWithAggregatesFilter<"Student"> | string | null
    gender?: StringWithAggregatesFilter<"Student"> | string
    class_name?: StringWithAggregatesFilter<"Student"> | string
    address?: StringNullableWithAggregatesFilter<"Student"> | string | null
  }

  export type AssessmentWhereInput = {
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    id?: IntFilter<"Assessment"> | number
    studentId?: IntFilter<"Assessment"> | number
    tpId?: IntFilter<"Assessment"> | number
    score?: IntFilter<"Assessment"> | number
    type?: StringFilter<"Assessment"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    tp?: XOR<TPScalarRelationFilter, TPWhereInput>
  }

  export type AssessmentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    tpId?: SortOrder
    score?: SortOrder
    type?: SortOrder
    student?: StudentOrderByWithRelationInput
    tp?: TPOrderByWithRelationInput
  }

  export type AssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    studentId?: IntFilter<"Assessment"> | number
    tpId?: IntFilter<"Assessment"> | number
    score?: IntFilter<"Assessment"> | number
    type?: StringFilter<"Assessment"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    tp?: XOR<TPScalarRelationFilter, TPWhereInput>
  }, "id">

  export type AssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    tpId?: SortOrder
    score?: SortOrder
    type?: SortOrder
    _count?: AssessmentCountOrderByAggregateInput
    _avg?: AssessmentAvgOrderByAggregateInput
    _max?: AssessmentMaxOrderByAggregateInput
    _min?: AssessmentMinOrderByAggregateInput
    _sum?: AssessmentSumOrderByAggregateInput
  }

  export type AssessmentScalarWhereWithAggregatesInput = {
    AND?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    OR?: AssessmentScalarWhereWithAggregatesInput[]
    NOT?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Assessment"> | number
    studentId?: IntWithAggregatesFilter<"Assessment"> | number
    tpId?: IntWithAggregatesFilter<"Assessment"> | number
    score?: IntWithAggregatesFilter<"Assessment"> | number
    type?: StringWithAggregatesFilter<"Assessment"> | string
  }

  export type TahfidzWhereInput = {
    AND?: TahfidzWhereInput | TahfidzWhereInput[]
    OR?: TahfidzWhereInput[]
    NOT?: TahfidzWhereInput | TahfidzWhereInput[]
    id?: IntFilter<"Tahfidz"> | number
    studentId?: IntFilter<"Tahfidz"> | number
    juz?: IntFilter<"Tahfidz"> | number
    surah?: StringFilter<"Tahfidz"> | string
    ayat?: StringFilter<"Tahfidz"> | string
    predicate?: StringFilter<"Tahfidz"> | string
    date?: DateTimeFilter<"Tahfidz"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type TahfidzOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    juz?: SortOrder
    surah?: SortOrder
    ayat?: SortOrder
    predicate?: SortOrder
    date?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type TahfidzWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TahfidzWhereInput | TahfidzWhereInput[]
    OR?: TahfidzWhereInput[]
    NOT?: TahfidzWhereInput | TahfidzWhereInput[]
    studentId?: IntFilter<"Tahfidz"> | number
    juz?: IntFilter<"Tahfidz"> | number
    surah?: StringFilter<"Tahfidz"> | string
    ayat?: StringFilter<"Tahfidz"> | string
    predicate?: StringFilter<"Tahfidz"> | string
    date?: DateTimeFilter<"Tahfidz"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type TahfidzOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    juz?: SortOrder
    surah?: SortOrder
    ayat?: SortOrder
    predicate?: SortOrder
    date?: SortOrder
    _count?: TahfidzCountOrderByAggregateInput
    _avg?: TahfidzAvgOrderByAggregateInput
    _max?: TahfidzMaxOrderByAggregateInput
    _min?: TahfidzMinOrderByAggregateInput
    _sum?: TahfidzSumOrderByAggregateInput
  }

  export type TahfidzScalarWhereWithAggregatesInput = {
    AND?: TahfidzScalarWhereWithAggregatesInput | TahfidzScalarWhereWithAggregatesInput[]
    OR?: TahfidzScalarWhereWithAggregatesInput[]
    NOT?: TahfidzScalarWhereWithAggregatesInput | TahfidzScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tahfidz"> | number
    studentId?: IntWithAggregatesFilter<"Tahfidz"> | number
    juz?: IntWithAggregatesFilter<"Tahfidz"> | number
    surah?: StringWithAggregatesFilter<"Tahfidz"> | string
    ayat?: StringWithAggregatesFilter<"Tahfidz"> | string
    predicate?: StringWithAggregatesFilter<"Tahfidz"> | string
    date?: DateTimeWithAggregatesFilter<"Tahfidz"> | Date | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: IntFilter<"Attendance"> | number
    studentId?: IntFilter<"Attendance"> | number
    status?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    date?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    studentId?: IntFilter<"Attendance"> | number
    status?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    date?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attendance"> | number
    studentId?: IntWithAggregatesFilter<"Attendance"> | number
    status?: StringWithAggregatesFilter<"Attendance"> | string
    date?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
  }

  export type ClassRoomWhereInput = {
    AND?: ClassRoomWhereInput | ClassRoomWhereInput[]
    OR?: ClassRoomWhereInput[]
    NOT?: ClassRoomWhereInput | ClassRoomWhereInput[]
    id?: IntFilter<"ClassRoom"> | number
    name?: StringFilter<"ClassRoom"> | string
    level?: StringFilter<"ClassRoom"> | string
    grade?: IntFilter<"ClassRoom"> | number
    status?: StringFilter<"ClassRoom"> | string
  }

  export type ClassRoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    grade?: SortOrder
    status?: SortOrder
  }

  export type ClassRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: ClassRoomWhereInput | ClassRoomWhereInput[]
    OR?: ClassRoomWhereInput[]
    NOT?: ClassRoomWhereInput | ClassRoomWhereInput[]
    level?: StringFilter<"ClassRoom"> | string
    grade?: IntFilter<"ClassRoom"> | number
    status?: StringFilter<"ClassRoom"> | string
  }, "id" | "name">

  export type ClassRoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    grade?: SortOrder
    status?: SortOrder
    _count?: ClassRoomCountOrderByAggregateInput
    _avg?: ClassRoomAvgOrderByAggregateInput
    _max?: ClassRoomMaxOrderByAggregateInput
    _min?: ClassRoomMinOrderByAggregateInput
    _sum?: ClassRoomSumOrderByAggregateInput
  }

  export type ClassRoomScalarWhereWithAggregatesInput = {
    AND?: ClassRoomScalarWhereWithAggregatesInput | ClassRoomScalarWhereWithAggregatesInput[]
    OR?: ClassRoomScalarWhereWithAggregatesInput[]
    NOT?: ClassRoomScalarWhereWithAggregatesInput | ClassRoomScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ClassRoom"> | number
    name?: StringWithAggregatesFilter<"ClassRoom"> | string
    level?: StringWithAggregatesFilter<"ClassRoom"> | string
    grade?: IntWithAggregatesFilter<"ClassRoom"> | number
    status?: StringWithAggregatesFilter<"ClassRoom"> | string
  }

  export type AssignmentWhereInput = {
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    id?: IntFilter<"Assignment"> | number
    teacherId?: IntFilter<"Assignment"> | number
    subjectId?: IntFilter<"Assignment"> | number
    className?: StringFilter<"Assignment"> | string
    academicYear?: StringFilter<"Assignment"> | string
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }

  export type AssignmentOrderByWithRelationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    academicYear?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
  }

  export type AssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    teacherId_subjectId_className_academicYear?: AssignmentTeacherIdSubjectIdClassNameAcademicYearCompoundUniqueInput
    AND?: AssignmentWhereInput | AssignmentWhereInput[]
    OR?: AssignmentWhereInput[]
    NOT?: AssignmentWhereInput | AssignmentWhereInput[]
    teacherId?: IntFilter<"Assignment"> | number
    subjectId?: IntFilter<"Assignment"> | number
    className?: StringFilter<"Assignment"> | string
    academicYear?: StringFilter<"Assignment"> | string
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }, "id" | "teacherId_subjectId_className_academicYear">

  export type AssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    academicYear?: SortOrder
    _count?: AssignmentCountOrderByAggregateInput
    _avg?: AssignmentAvgOrderByAggregateInput
    _max?: AssignmentMaxOrderByAggregateInput
    _min?: AssignmentMinOrderByAggregateInput
    _sum?: AssignmentSumOrderByAggregateInput
  }

  export type AssignmentScalarWhereWithAggregatesInput = {
    AND?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    OR?: AssignmentScalarWhereWithAggregatesInput[]
    NOT?: AssignmentScalarWhereWithAggregatesInput | AssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Assignment"> | number
    teacherId?: IntWithAggregatesFilter<"Assignment"> | number
    subjectId?: IntWithAggregatesFilter<"Assignment"> | number
    className?: StringWithAggregatesFilter<"Assignment"> | string
    academicYear?: StringWithAggregatesFilter<"Assignment"> | string
  }

  export type ScoreRecordWhereInput = {
    AND?: ScoreRecordWhereInput | ScoreRecordWhereInput[]
    OR?: ScoreRecordWhereInput[]
    NOT?: ScoreRecordWhereInput | ScoreRecordWhereInput[]
    id?: IntFilter<"ScoreRecord"> | number
    studentId?: IntFilter<"ScoreRecord"> | number
    subjectId?: IntFilter<"ScoreRecord"> | number
    className?: StringFilter<"ScoreRecord"> | string
    type?: StringFilter<"ScoreRecord"> | string
    scoreNumber?: IntFilter<"ScoreRecord"> | number
    scoreText?: StringFilter<"ScoreRecord"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }

  export type ScoreRecordOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    type?: SortOrder
    scoreNumber?: SortOrder
    scoreText?: SortOrder
    student?: StudentOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
  }

  export type ScoreRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentId_subjectId_type?: ScoreRecordStudentIdSubjectIdTypeCompoundUniqueInput
    AND?: ScoreRecordWhereInput | ScoreRecordWhereInput[]
    OR?: ScoreRecordWhereInput[]
    NOT?: ScoreRecordWhereInput | ScoreRecordWhereInput[]
    studentId?: IntFilter<"ScoreRecord"> | number
    subjectId?: IntFilter<"ScoreRecord"> | number
    className?: StringFilter<"ScoreRecord"> | string
    type?: StringFilter<"ScoreRecord"> | string
    scoreNumber?: IntFilter<"ScoreRecord"> | number
    scoreText?: StringFilter<"ScoreRecord"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }, "id" | "studentId_subjectId_type">

  export type ScoreRecordOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    type?: SortOrder
    scoreNumber?: SortOrder
    scoreText?: SortOrder
    _count?: ScoreRecordCountOrderByAggregateInput
    _avg?: ScoreRecordAvgOrderByAggregateInput
    _max?: ScoreRecordMaxOrderByAggregateInput
    _min?: ScoreRecordMinOrderByAggregateInput
    _sum?: ScoreRecordSumOrderByAggregateInput
  }

  export type ScoreRecordScalarWhereWithAggregatesInput = {
    AND?: ScoreRecordScalarWhereWithAggregatesInput | ScoreRecordScalarWhereWithAggregatesInput[]
    OR?: ScoreRecordScalarWhereWithAggregatesInput[]
    NOT?: ScoreRecordScalarWhereWithAggregatesInput | ScoreRecordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ScoreRecord"> | number
    studentId?: IntWithAggregatesFilter<"ScoreRecord"> | number
    subjectId?: IntWithAggregatesFilter<"ScoreRecord"> | number
    className?: StringWithAggregatesFilter<"ScoreRecord"> | string
    type?: StringWithAggregatesFilter<"ScoreRecord"> | string
    scoreNumber?: IntWithAggregatesFilter<"ScoreRecord"> | number
    scoreText?: StringWithAggregatesFilter<"ScoreRecord"> | string
  }

  export type PersonalityWhereInput = {
    AND?: PersonalityWhereInput | PersonalityWhereInput[]
    OR?: PersonalityWhereInput[]
    NOT?: PersonalityWhereInput | PersonalityWhereInput[]
    id?: IntFilter<"Personality"> | number
    studentId?: IntFilter<"Personality"> | number
    className?: StringFilter<"Personality"> | string
    suluk?: StringFilter<"Personality"> | string
    muwadhotah?: StringFilter<"Personality"> | string
    nadzofah?: StringFilter<"Personality"> | string
    indhiplat?: StringFilter<"Personality"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type PersonalityOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    suluk?: SortOrder
    muwadhotah?: SortOrder
    nadzofah?: SortOrder
    indhiplat?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type PersonalityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentId?: number
    AND?: PersonalityWhereInput | PersonalityWhereInput[]
    OR?: PersonalityWhereInput[]
    NOT?: PersonalityWhereInput | PersonalityWhereInput[]
    className?: StringFilter<"Personality"> | string
    suluk?: StringFilter<"Personality"> | string
    muwadhotah?: StringFilter<"Personality"> | string
    nadzofah?: StringFilter<"Personality"> | string
    indhiplat?: StringFilter<"Personality"> | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id" | "studentId">

  export type PersonalityOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    suluk?: SortOrder
    muwadhotah?: SortOrder
    nadzofah?: SortOrder
    indhiplat?: SortOrder
    _count?: PersonalityCountOrderByAggregateInput
    _avg?: PersonalityAvgOrderByAggregateInput
    _max?: PersonalityMaxOrderByAggregateInput
    _min?: PersonalityMinOrderByAggregateInput
    _sum?: PersonalitySumOrderByAggregateInput
  }

  export type PersonalityScalarWhereWithAggregatesInput = {
    AND?: PersonalityScalarWhereWithAggregatesInput | PersonalityScalarWhereWithAggregatesInput[]
    OR?: PersonalityScalarWhereWithAggregatesInput[]
    NOT?: PersonalityScalarWhereWithAggregatesInput | PersonalityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Personality"> | number
    studentId?: IntWithAggregatesFilter<"Personality"> | number
    className?: StringWithAggregatesFilter<"Personality"> | string
    suluk?: StringWithAggregatesFilter<"Personality"> | string
    muwadhotah?: StringWithAggregatesFilter<"Personality"> | string
    nadzofah?: StringWithAggregatesFilter<"Personality"> | string
    indhiplat?: StringWithAggregatesFilter<"Personality"> | string
  }

  export type HomeroomNoteWhereInput = {
    AND?: HomeroomNoteWhereInput | HomeroomNoteWhereInput[]
    OR?: HomeroomNoteWhereInput[]
    NOT?: HomeroomNoteWhereInput | HomeroomNoteWhereInput[]
    id?: IntFilter<"HomeroomNote"> | number
    studentId?: IntFilter<"HomeroomNote"> | number
    className?: StringFilter<"HomeroomNote"> | string
    note?: StringFilter<"HomeroomNote"> | string
    updatedAt?: DateTimeFilter<"HomeroomNote"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type HomeroomNoteOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    note?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type HomeroomNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentId?: number
    AND?: HomeroomNoteWhereInput | HomeroomNoteWhereInput[]
    OR?: HomeroomNoteWhereInput[]
    NOT?: HomeroomNoteWhereInput | HomeroomNoteWhereInput[]
    className?: StringFilter<"HomeroomNote"> | string
    note?: StringFilter<"HomeroomNote"> | string
    updatedAt?: DateTimeFilter<"HomeroomNote"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id" | "studentId">

  export type HomeroomNoteOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    note?: SortOrder
    updatedAt?: SortOrder
    _count?: HomeroomNoteCountOrderByAggregateInput
    _avg?: HomeroomNoteAvgOrderByAggregateInput
    _max?: HomeroomNoteMaxOrderByAggregateInput
    _min?: HomeroomNoteMinOrderByAggregateInput
    _sum?: HomeroomNoteSumOrderByAggregateInput
  }

  export type HomeroomNoteScalarWhereWithAggregatesInput = {
    AND?: HomeroomNoteScalarWhereWithAggregatesInput | HomeroomNoteScalarWhereWithAggregatesInput[]
    OR?: HomeroomNoteScalarWhereWithAggregatesInput[]
    NOT?: HomeroomNoteScalarWhereWithAggregatesInput | HomeroomNoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HomeroomNote"> | number
    studentId?: IntWithAggregatesFilter<"HomeroomNote"> | number
    className?: StringWithAggregatesFilter<"HomeroomNote"> | string
    note?: StringWithAggregatesFilter<"HomeroomNote"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"HomeroomNote"> | Date | string
  }

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    id?: IntFilter<"SystemSetting"> | number
    schoolName?: StringFilter<"SystemSetting"> | string
    academicYear?: StringFilter<"SystemSetting"> | string
    semester?: StringFilter<"SystemSetting"> | string
    principalName?: StringFilter<"SystemSetting"> | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }

  export type SystemSettingOrderByWithRelationInput = {
    id?: SortOrder
    schoolName?: SortOrder
    academicYear?: SortOrder
    semester?: SortOrder
    principalName?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    schoolName?: StringFilter<"SystemSetting"> | string
    academicYear?: StringFilter<"SystemSetting"> | string
    semester?: StringFilter<"SystemSetting"> | string
    principalName?: StringFilter<"SystemSetting"> | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }, "id">

  export type SystemSettingOrderByWithAggregationInput = {
    id?: SortOrder
    schoolName?: SortOrder
    academicYear?: SortOrder
    semester?: SortOrder
    principalName?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemSettingCountOrderByAggregateInput
    _avg?: SystemSettingAvgOrderByAggregateInput
    _max?: SystemSettingMaxOrderByAggregateInput
    _min?: SystemSettingMinOrderByAggregateInput
    _sum?: SystemSettingSumOrderByAggregateInput
  }

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    OR?: SystemSettingScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SystemSetting"> | number
    schoolName?: StringWithAggregatesFilter<"SystemSetting"> | string
    academicYear?: StringWithAggregatesFilter<"SystemSetting"> | string
    semester?: StringWithAggregatesFilter<"SystemSetting"> | string
    principalName?: StringWithAggregatesFilter<"SystemSetting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemSetting"> | Date | string
  }

  export type TeacherCreateInput = {
    identity_number: string
    password: string
    fullname: string
    birth_date?: string | null
    education?: string | null
    address?: string | null
    role?: string
    assignments?: AssignmentCreateNestedManyWithoutTeacherInput
    subjects?: SubjectCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: number
    identity_number: string
    password: string
    fullname: string
    birth_date?: string | null
    education?: string | null
    address?: string | null
    role?: string
    assignments?: AssignmentUncheckedCreateNestedManyWithoutTeacherInput
    subjects?: SubjectUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignments?: AssignmentUpdateManyWithoutTeacherNestedInput
    subjects?: SubjectUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignments?: AssignmentUncheckedUpdateManyWithoutTeacherNestedInput
    subjects?: SubjectUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: number
    identity_number: string
    password: string
    fullname: string
    birth_date?: string | null
    education?: string | null
    address?: string | null
    role?: string
  }

  export type TeacherUpdateManyMutationInput = {
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectCreateInput = {
    name: string
    teacher: TeacherCreateNestedOneWithoutSubjectsInput
    assignments?: AssignmentCreateNestedManyWithoutSubjectInput
    cps?: CPCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: number
    name: string
    teacherId: number
    assignments?: AssignmentUncheckedCreateNestedManyWithoutSubjectInput
    cps?: CPUncheckedCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutSubjectsNestedInput
    assignments?: AssignmentUpdateManyWithoutSubjectNestedInput
    cps?: CPUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    assignments?: AssignmentUncheckedUpdateManyWithoutSubjectNestedInput
    cps?: CPUncheckedUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: number
    name: string
    teacherId: number
  }

  export type SubjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
  }

  export type CPCreateInput = {
    code: string
    description: string
    subject: SubjectCreateNestedOneWithoutCpsInput
    tps?: TPCreateNestedManyWithoutCpInput
  }

  export type CPUncheckedCreateInput = {
    id?: number
    code: string
    description: string
    subjectId: number
    tps?: TPUncheckedCreateNestedManyWithoutCpInput
  }

  export type CPUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    subject?: SubjectUpdateOneRequiredWithoutCpsNestedInput
    tps?: TPUpdateManyWithoutCpNestedInput
  }

  export type CPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    subjectId?: IntFieldUpdateOperationsInput | number
    tps?: TPUncheckedUpdateManyWithoutCpNestedInput
  }

  export type CPCreateManyInput = {
    id?: number
    code: string
    description: string
    subjectId: number
  }

  export type CPUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type CPUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    subjectId?: IntFieldUpdateOperationsInput | number
  }

  export type TPCreateInput = {
    code: string
    description: string
    cp: CPCreateNestedOneWithoutTpsInput
    assessments?: AssessmentCreateNestedManyWithoutTpInput
  }

  export type TPUncheckedCreateInput = {
    id?: number
    code: string
    description: string
    cpId: number
    assessments?: AssessmentUncheckedCreateNestedManyWithoutTpInput
  }

  export type TPUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cp?: CPUpdateOneRequiredWithoutTpsNestedInput
    assessments?: AssessmentUpdateManyWithoutTpNestedInput
  }

  export type TPUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cpId?: IntFieldUpdateOperationsInput | number
    assessments?: AssessmentUncheckedUpdateManyWithoutTpNestedInput
  }

  export type TPCreateManyInput = {
    id?: number
    code: string
    description: string
    cpId: number
  }

  export type TPUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type TPUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cpId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentCreateInput = {
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentCreateNestedManyWithoutStudentInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteCreateNestedOneWithoutStudentInput
    personality?: PersonalityCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentUncheckedCreateNestedManyWithoutStudentInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteUncheckedCreateNestedOneWithoutStudentInput
    personality?: PersonalityUncheckedCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUncheckedUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUncheckedUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUncheckedUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
  }

  export type StudentUpdateManyMutationInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AssessmentCreateInput = {
    score: number
    type: string
    student: StudentCreateNestedOneWithoutAssessmentsInput
    tp: TPCreateNestedOneWithoutAssessmentsInput
  }

  export type AssessmentUncheckedCreateInput = {
    id?: number
    studentId: number
    tpId: number
    score: number
    type: string
  }

  export type AssessmentUpdateInput = {
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutAssessmentsNestedInput
    tp?: TPUpdateOneRequiredWithoutAssessmentsNestedInput
  }

  export type AssessmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    tpId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentCreateManyInput = {
    id?: number
    studentId: number
    tpId: number
    score: number
    type: string
  }

  export type AssessmentUpdateManyMutationInput = {
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    tpId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TahfidzCreateInput = {
    juz: number
    surah: string
    ayat: string
    predicate: string
    date?: Date | string
    student: StudentCreateNestedOneWithoutTahfidzsInput
  }

  export type TahfidzUncheckedCreateInput = {
    id?: number
    studentId: number
    juz: number
    surah: string
    ayat: string
    predicate: string
    date?: Date | string
  }

  export type TahfidzUpdateInput = {
    juz?: IntFieldUpdateOperationsInput | number
    surah?: StringFieldUpdateOperationsInput | string
    ayat?: StringFieldUpdateOperationsInput | string
    predicate?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutTahfidzsNestedInput
  }

  export type TahfidzUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    juz?: IntFieldUpdateOperationsInput | number
    surah?: StringFieldUpdateOperationsInput | string
    ayat?: StringFieldUpdateOperationsInput | string
    predicate?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TahfidzCreateManyInput = {
    id?: number
    studentId: number
    juz: number
    surah: string
    ayat: string
    predicate: string
    date?: Date | string
  }

  export type TahfidzUpdateManyMutationInput = {
    juz?: IntFieldUpdateOperationsInput | number
    surah?: StringFieldUpdateOperationsInput | string
    ayat?: StringFieldUpdateOperationsInput | string
    predicate?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TahfidzUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    juz?: IntFieldUpdateOperationsInput | number
    surah?: StringFieldUpdateOperationsInput | string
    ayat?: StringFieldUpdateOperationsInput | string
    predicate?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateInput = {
    status: string
    date?: Date | string
    student: StudentCreateNestedOneWithoutAttendancesInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: number
    studentId: number
    status: string
    date?: Date | string
  }

  export type AttendanceUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAttendancesNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyInput = {
    id?: number
    studentId: number
    status: string
    date?: Date | string
  }

  export type AttendanceUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassRoomCreateInput = {
    name: string
    level: string
    grade: number
    status?: string
  }

  export type ClassRoomUncheckedCreateInput = {
    id?: number
    name: string
    level: string
    grade: number
    status?: string
  }

  export type ClassRoomUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ClassRoomUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ClassRoomCreateManyInput = {
    id?: number
    name: string
    level: string
    grade: number
    status?: string
  }

  export type ClassRoomUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ClassRoomUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    grade?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentCreateInput = {
    className: string
    academicYear?: string
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
  }

  export type AssignmentUncheckedCreateInput = {
    id?: number
    teacherId: number
    subjectId: number
    className: string
    academicYear?: string
  }

  export type AssignmentUpdateInput = {
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type AssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentCreateManyInput = {
    id?: number
    teacherId: number
    subjectId: number
    className: string
    academicYear?: string
  }

  export type AssignmentUpdateManyMutationInput = {
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreRecordCreateInput = {
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
    student: StudentCreateNestedOneWithoutScoreRecordsInput
    subject: SubjectCreateNestedOneWithoutScoreRecordsInput
  }

  export type ScoreRecordUncheckedCreateInput = {
    id?: number
    studentId: number
    subjectId: number
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
  }

  export type ScoreRecordUpdateInput = {
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutScoreRecordsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutScoreRecordsNestedInput
  }

  export type ScoreRecordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreRecordCreateManyInput = {
    id?: number
    studentId: number
    subjectId: number
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
  }

  export type ScoreRecordUpdateManyMutationInput = {
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreRecordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
  }

  export type PersonalityCreateInput = {
    className: string
    suluk?: string
    muwadhotah?: string
    nadzofah?: string
    indhiplat?: string
    student: StudentCreateNestedOneWithoutPersonalityInput
  }

  export type PersonalityUncheckedCreateInput = {
    id?: number
    studentId: number
    className: string
    suluk?: string
    muwadhotah?: string
    nadzofah?: string
    indhiplat?: string
  }

  export type PersonalityUpdateInput = {
    className?: StringFieldUpdateOperationsInput | string
    suluk?: StringFieldUpdateOperationsInput | string
    muwadhotah?: StringFieldUpdateOperationsInput | string
    nadzofah?: StringFieldUpdateOperationsInput | string
    indhiplat?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutPersonalityNestedInput
  }

  export type PersonalityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    suluk?: StringFieldUpdateOperationsInput | string
    muwadhotah?: StringFieldUpdateOperationsInput | string
    nadzofah?: StringFieldUpdateOperationsInput | string
    indhiplat?: StringFieldUpdateOperationsInput | string
  }

  export type PersonalityCreateManyInput = {
    id?: number
    studentId: number
    className: string
    suluk?: string
    muwadhotah?: string
    nadzofah?: string
    indhiplat?: string
  }

  export type PersonalityUpdateManyMutationInput = {
    className?: StringFieldUpdateOperationsInput | string
    suluk?: StringFieldUpdateOperationsInput | string
    muwadhotah?: StringFieldUpdateOperationsInput | string
    nadzofah?: StringFieldUpdateOperationsInput | string
    indhiplat?: StringFieldUpdateOperationsInput | string
  }

  export type PersonalityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    suluk?: StringFieldUpdateOperationsInput | string
    muwadhotah?: StringFieldUpdateOperationsInput | string
    nadzofah?: StringFieldUpdateOperationsInput | string
    indhiplat?: StringFieldUpdateOperationsInput | string
  }

  export type HomeroomNoteCreateInput = {
    className: string
    note?: string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutHomeroomNoteInput
  }

  export type HomeroomNoteUncheckedCreateInput = {
    id?: number
    studentId: number
    className: string
    note?: string
    updatedAt?: Date | string
  }

  export type HomeroomNoteUpdateInput = {
    className?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutHomeroomNoteNestedInput
  }

  export type HomeroomNoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HomeroomNoteCreateManyInput = {
    id?: number
    studentId: number
    className: string
    note?: string
    updatedAt?: Date | string
  }

  export type HomeroomNoteUpdateManyMutationInput = {
    className?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HomeroomNoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateInput = {
    schoolName?: string
    academicYear?: string
    semester?: string
    principalName?: string
    updatedAt?: Date | string
  }

  export type SystemSettingUncheckedCreateInput = {
    id?: number
    schoolName?: string
    academicYear?: string
    semester?: string
    principalName?: string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateInput = {
    schoolName?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    principalName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    schoolName?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    principalName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateManyInput = {
    id?: number
    schoolName?: string
    academicYear?: string
    semester?: string
    principalName?: string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateManyMutationInput = {
    schoolName?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    principalName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    schoolName?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    semester?: StringFieldUpdateOperationsInput | string
    principalName?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AssignmentListRelationFilter = {
    every?: AssignmentWhereInput
    some?: AssignmentWhereInput
    none?: AssignmentWhereInput
  }

  export type SubjectListRelationFilter = {
    every?: SubjectWhereInput
    some?: SubjectWhereInput
    none?: SubjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    identity_number?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    birth_date?: SortOrder
    education?: SortOrder
    address?: SortOrder
    role?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    identity_number?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    birth_date?: SortOrder
    education?: SortOrder
    address?: SortOrder
    role?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    identity_number?: SortOrder
    password?: SortOrder
    fullname?: SortOrder
    birth_date?: SortOrder
    education?: SortOrder
    address?: SortOrder
    role?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TeacherScalarRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type CPListRelationFilter = {
    every?: CPWhereInput
    some?: CPWhereInput
    none?: CPWhereInput
  }

  export type ScoreRecordListRelationFilter = {
    every?: ScoreRecordWhereInput
    some?: ScoreRecordWhereInput
    none?: ScoreRecordWhereInput
  }

  export type CPOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScoreRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
  }

  export type SubjectAvgOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    teacherId?: SortOrder
  }

  export type SubjectSumOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
  }

  export type SubjectScalarRelationFilter = {
    is?: SubjectWhereInput
    isNot?: SubjectWhereInput
  }

  export type TPListRelationFilter = {
    every?: TPWhereInput
    some?: TPWhereInput
    none?: TPWhereInput
  }

  export type TPOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CPCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    subjectId?: SortOrder
  }

  export type CPAvgOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
  }

  export type CPMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    subjectId?: SortOrder
  }

  export type CPMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    subjectId?: SortOrder
  }

  export type CPSumOrderByAggregateInput = {
    id?: SortOrder
    subjectId?: SortOrder
  }

  export type CPScalarRelationFilter = {
    is?: CPWhereInput
    isNot?: CPWhereInput
  }

  export type AssessmentListRelationFilter = {
    every?: AssessmentWhereInput
    some?: AssessmentWhereInput
    none?: AssessmentWhereInput
  }

  export type AssessmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TPCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    cpId?: SortOrder
  }

  export type TPAvgOrderByAggregateInput = {
    id?: SortOrder
    cpId?: SortOrder
  }

  export type TPMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    cpId?: SortOrder
  }

  export type TPMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    description?: SortOrder
    cpId?: SortOrder
  }

  export type TPSumOrderByAggregateInput = {
    id?: SortOrder
    cpId?: SortOrder
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type HomeroomNoteNullableScalarRelationFilter = {
    is?: HomeroomNoteWhereInput | null
    isNot?: HomeroomNoteWhereInput | null
  }

  export type PersonalityNullableScalarRelationFilter = {
    is?: PersonalityWhereInput | null
    isNot?: PersonalityWhereInput | null
  }

  export type TahfidzListRelationFilter = {
    every?: TahfidzWhereInput
    some?: TahfidzWhereInput
    none?: TahfidzWhereInput
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TahfidzOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    fullname?: SortOrder
    birth_info?: SortOrder
    gender?: SortOrder
    class_name?: SortOrder
    address?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    fullname?: SortOrder
    birth_info?: SortOrder
    gender?: SortOrder
    class_name?: SortOrder
    address?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    fullname?: SortOrder
    birth_info?: SortOrder
    gender?: SortOrder
    class_name?: SortOrder
    address?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type TPScalarRelationFilter = {
    is?: TPWhereInput
    isNot?: TPWhereInput
  }

  export type AssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    tpId?: SortOrder
    score?: SortOrder
    type?: SortOrder
  }

  export type AssessmentAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    tpId?: SortOrder
    score?: SortOrder
  }

  export type AssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    tpId?: SortOrder
    score?: SortOrder
    type?: SortOrder
  }

  export type AssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    tpId?: SortOrder
    score?: SortOrder
    type?: SortOrder
  }

  export type AssessmentSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    tpId?: SortOrder
    score?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TahfidzCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    juz?: SortOrder
    surah?: SortOrder
    ayat?: SortOrder
    predicate?: SortOrder
    date?: SortOrder
  }

  export type TahfidzAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    juz?: SortOrder
  }

  export type TahfidzMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    juz?: SortOrder
    surah?: SortOrder
    ayat?: SortOrder
    predicate?: SortOrder
    date?: SortOrder
  }

  export type TahfidzMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    juz?: SortOrder
    surah?: SortOrder
    ayat?: SortOrder
    predicate?: SortOrder
    date?: SortOrder
  }

  export type TahfidzSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    juz?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    date?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    date?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    status?: SortOrder
    date?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type ClassRoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    grade?: SortOrder
    status?: SortOrder
  }

  export type ClassRoomAvgOrderByAggregateInput = {
    id?: SortOrder
    grade?: SortOrder
  }

  export type ClassRoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    grade?: SortOrder
    status?: SortOrder
  }

  export type ClassRoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    grade?: SortOrder
    status?: SortOrder
  }

  export type ClassRoomSumOrderByAggregateInput = {
    id?: SortOrder
    grade?: SortOrder
  }

  export type AssignmentTeacherIdSubjectIdClassNameAcademicYearCompoundUniqueInput = {
    teacherId: number
    subjectId: number
    className: string
    academicYear: string
  }

  export type AssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    academicYear?: SortOrder
  }

  export type AssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
  }

  export type AssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    academicYear?: SortOrder
  }

  export type AssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    academicYear?: SortOrder
  }

  export type AssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
  }

  export type ScoreRecordStudentIdSubjectIdTypeCompoundUniqueInput = {
    studentId: number
    subjectId: number
    type: string
  }

  export type ScoreRecordCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    type?: SortOrder
    scoreNumber?: SortOrder
    scoreText?: SortOrder
  }

  export type ScoreRecordAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    scoreNumber?: SortOrder
  }

  export type ScoreRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    type?: SortOrder
    scoreNumber?: SortOrder
    scoreText?: SortOrder
  }

  export type ScoreRecordMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    className?: SortOrder
    type?: SortOrder
    scoreNumber?: SortOrder
    scoreText?: SortOrder
  }

  export type ScoreRecordSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    scoreNumber?: SortOrder
  }

  export type PersonalityCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    suluk?: SortOrder
    muwadhotah?: SortOrder
    nadzofah?: SortOrder
    indhiplat?: SortOrder
  }

  export type PersonalityAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type PersonalityMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    suluk?: SortOrder
    muwadhotah?: SortOrder
    nadzofah?: SortOrder
    indhiplat?: SortOrder
  }

  export type PersonalityMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    suluk?: SortOrder
    muwadhotah?: SortOrder
    nadzofah?: SortOrder
    indhiplat?: SortOrder
  }

  export type PersonalitySumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type HomeroomNoteCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    note?: SortOrder
    updatedAt?: SortOrder
  }

  export type HomeroomNoteAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type HomeroomNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    note?: SortOrder
    updatedAt?: SortOrder
  }

  export type HomeroomNoteMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    className?: SortOrder
    note?: SortOrder
    updatedAt?: SortOrder
  }

  export type HomeroomNoteSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
  }

  export type SystemSettingCountOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    academicYear?: SortOrder
    semester?: SortOrder
    principalName?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SystemSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    academicYear?: SortOrder
    semester?: SortOrder
    principalName?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMinOrderByAggregateInput = {
    id?: SortOrder
    schoolName?: SortOrder
    academicYear?: SortOrder
    semester?: SortOrder
    principalName?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AssignmentCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AssignmentCreateWithoutTeacherInput, AssignmentUncheckedCreateWithoutTeacherInput> | AssignmentCreateWithoutTeacherInput[] | AssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutTeacherInput | AssignmentCreateOrConnectWithoutTeacherInput[]
    createMany?: AssignmentCreateManyTeacherInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type SubjectCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SubjectCreateWithoutTeacherInput, SubjectUncheckedCreateWithoutTeacherInput> | SubjectCreateWithoutTeacherInput[] | SubjectUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeacherInput | SubjectCreateOrConnectWithoutTeacherInput[]
    createMany?: SubjectCreateManyTeacherInputEnvelope
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type AssignmentUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AssignmentCreateWithoutTeacherInput, AssignmentUncheckedCreateWithoutTeacherInput> | AssignmentCreateWithoutTeacherInput[] | AssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutTeacherInput | AssignmentCreateOrConnectWithoutTeacherInput[]
    createMany?: AssignmentCreateManyTeacherInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type SubjectUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SubjectCreateWithoutTeacherInput, SubjectUncheckedCreateWithoutTeacherInput> | SubjectCreateWithoutTeacherInput[] | SubjectUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeacherInput | SubjectCreateOrConnectWithoutTeacherInput[]
    createMany?: SubjectCreateManyTeacherInputEnvelope
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AssignmentUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AssignmentCreateWithoutTeacherInput, AssignmentUncheckedCreateWithoutTeacherInput> | AssignmentCreateWithoutTeacherInput[] | AssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutTeacherInput | AssignmentCreateOrConnectWithoutTeacherInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutTeacherInput | AssignmentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AssignmentCreateManyTeacherInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutTeacherInput | AssignmentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutTeacherInput | AssignmentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type SubjectUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SubjectCreateWithoutTeacherInput, SubjectUncheckedCreateWithoutTeacherInput> | SubjectCreateWithoutTeacherInput[] | SubjectUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeacherInput | SubjectCreateOrConnectWithoutTeacherInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutTeacherInput | SubjectUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SubjectCreateManyTeacherInputEnvelope
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutTeacherInput | SubjectUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutTeacherInput | SubjectUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AssignmentUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AssignmentCreateWithoutTeacherInput, AssignmentUncheckedCreateWithoutTeacherInput> | AssignmentCreateWithoutTeacherInput[] | AssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutTeacherInput | AssignmentCreateOrConnectWithoutTeacherInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutTeacherInput | AssignmentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AssignmentCreateManyTeacherInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutTeacherInput | AssignmentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutTeacherInput | AssignmentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type SubjectUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SubjectCreateWithoutTeacherInput, SubjectUncheckedCreateWithoutTeacherInput> | SubjectCreateWithoutTeacherInput[] | SubjectUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeacherInput | SubjectCreateOrConnectWithoutTeacherInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutTeacherInput | SubjectUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SubjectCreateManyTeacherInputEnvelope
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutTeacherInput | SubjectUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutTeacherInput | SubjectUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type TeacherCreateNestedOneWithoutSubjectsInput = {
    create?: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectsInput
    connect?: TeacherWhereUniqueInput
  }

  export type AssignmentCreateNestedManyWithoutSubjectInput = {
    create?: XOR<AssignmentCreateWithoutSubjectInput, AssignmentUncheckedCreateWithoutSubjectInput> | AssignmentCreateWithoutSubjectInput[] | AssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubjectInput | AssignmentCreateOrConnectWithoutSubjectInput[]
    createMany?: AssignmentCreateManySubjectInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type CPCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CPCreateWithoutSubjectInput, CPUncheckedCreateWithoutSubjectInput> | CPCreateWithoutSubjectInput[] | CPUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CPCreateOrConnectWithoutSubjectInput | CPCreateOrConnectWithoutSubjectInput[]
    createMany?: CPCreateManySubjectInputEnvelope
    connect?: CPWhereUniqueInput | CPWhereUniqueInput[]
  }

  export type ScoreRecordCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScoreRecordCreateWithoutSubjectInput, ScoreRecordUncheckedCreateWithoutSubjectInput> | ScoreRecordCreateWithoutSubjectInput[] | ScoreRecordUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutSubjectInput | ScoreRecordCreateOrConnectWithoutSubjectInput[]
    createMany?: ScoreRecordCreateManySubjectInputEnvelope
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
  }

  export type AssignmentUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<AssignmentCreateWithoutSubjectInput, AssignmentUncheckedCreateWithoutSubjectInput> | AssignmentCreateWithoutSubjectInput[] | AssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubjectInput | AssignmentCreateOrConnectWithoutSubjectInput[]
    createMany?: AssignmentCreateManySubjectInputEnvelope
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
  }

  export type CPUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CPCreateWithoutSubjectInput, CPUncheckedCreateWithoutSubjectInput> | CPCreateWithoutSubjectInput[] | CPUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CPCreateOrConnectWithoutSubjectInput | CPCreateOrConnectWithoutSubjectInput[]
    createMany?: CPCreateManySubjectInputEnvelope
    connect?: CPWhereUniqueInput | CPWhereUniqueInput[]
  }

  export type ScoreRecordUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<ScoreRecordCreateWithoutSubjectInput, ScoreRecordUncheckedCreateWithoutSubjectInput> | ScoreRecordCreateWithoutSubjectInput[] | ScoreRecordUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutSubjectInput | ScoreRecordCreateOrConnectWithoutSubjectInput[]
    createMany?: ScoreRecordCreateManySubjectInputEnvelope
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
  }

  export type TeacherUpdateOneRequiredWithoutSubjectsNestedInput = {
    create?: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectsInput
    upsert?: TeacherUpsertWithoutSubjectsInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutSubjectsInput, TeacherUpdateWithoutSubjectsInput>, TeacherUncheckedUpdateWithoutSubjectsInput>
  }

  export type AssignmentUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<AssignmentCreateWithoutSubjectInput, AssignmentUncheckedCreateWithoutSubjectInput> | AssignmentCreateWithoutSubjectInput[] | AssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubjectInput | AssignmentCreateOrConnectWithoutSubjectInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutSubjectInput | AssignmentUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: AssignmentCreateManySubjectInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutSubjectInput | AssignmentUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutSubjectInput | AssignmentUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type CPUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CPCreateWithoutSubjectInput, CPUncheckedCreateWithoutSubjectInput> | CPCreateWithoutSubjectInput[] | CPUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CPCreateOrConnectWithoutSubjectInput | CPCreateOrConnectWithoutSubjectInput[]
    upsert?: CPUpsertWithWhereUniqueWithoutSubjectInput | CPUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CPCreateManySubjectInputEnvelope
    set?: CPWhereUniqueInput | CPWhereUniqueInput[]
    disconnect?: CPWhereUniqueInput | CPWhereUniqueInput[]
    delete?: CPWhereUniqueInput | CPWhereUniqueInput[]
    connect?: CPWhereUniqueInput | CPWhereUniqueInput[]
    update?: CPUpdateWithWhereUniqueWithoutSubjectInput | CPUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CPUpdateManyWithWhereWithoutSubjectInput | CPUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CPScalarWhereInput | CPScalarWhereInput[]
  }

  export type ScoreRecordUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScoreRecordCreateWithoutSubjectInput, ScoreRecordUncheckedCreateWithoutSubjectInput> | ScoreRecordCreateWithoutSubjectInput[] | ScoreRecordUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutSubjectInput | ScoreRecordCreateOrConnectWithoutSubjectInput[]
    upsert?: ScoreRecordUpsertWithWhereUniqueWithoutSubjectInput | ScoreRecordUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScoreRecordCreateManySubjectInputEnvelope
    set?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    disconnect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    delete?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    update?: ScoreRecordUpdateWithWhereUniqueWithoutSubjectInput | ScoreRecordUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScoreRecordUpdateManyWithWhereWithoutSubjectInput | ScoreRecordUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScoreRecordScalarWhereInput | ScoreRecordScalarWhereInput[]
  }

  export type AssignmentUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<AssignmentCreateWithoutSubjectInput, AssignmentUncheckedCreateWithoutSubjectInput> | AssignmentCreateWithoutSubjectInput[] | AssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: AssignmentCreateOrConnectWithoutSubjectInput | AssignmentCreateOrConnectWithoutSubjectInput[]
    upsert?: AssignmentUpsertWithWhereUniqueWithoutSubjectInput | AssignmentUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: AssignmentCreateManySubjectInputEnvelope
    set?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    disconnect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    delete?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    connect?: AssignmentWhereUniqueInput | AssignmentWhereUniqueInput[]
    update?: AssignmentUpdateWithWhereUniqueWithoutSubjectInput | AssignmentUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: AssignmentUpdateManyWithWhereWithoutSubjectInput | AssignmentUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
  }

  export type CPUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CPCreateWithoutSubjectInput, CPUncheckedCreateWithoutSubjectInput> | CPCreateWithoutSubjectInput[] | CPUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CPCreateOrConnectWithoutSubjectInput | CPCreateOrConnectWithoutSubjectInput[]
    upsert?: CPUpsertWithWhereUniqueWithoutSubjectInput | CPUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CPCreateManySubjectInputEnvelope
    set?: CPWhereUniqueInput | CPWhereUniqueInput[]
    disconnect?: CPWhereUniqueInput | CPWhereUniqueInput[]
    delete?: CPWhereUniqueInput | CPWhereUniqueInput[]
    connect?: CPWhereUniqueInput | CPWhereUniqueInput[]
    update?: CPUpdateWithWhereUniqueWithoutSubjectInput | CPUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CPUpdateManyWithWhereWithoutSubjectInput | CPUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CPScalarWhereInput | CPScalarWhereInput[]
  }

  export type ScoreRecordUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<ScoreRecordCreateWithoutSubjectInput, ScoreRecordUncheckedCreateWithoutSubjectInput> | ScoreRecordCreateWithoutSubjectInput[] | ScoreRecordUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutSubjectInput | ScoreRecordCreateOrConnectWithoutSubjectInput[]
    upsert?: ScoreRecordUpsertWithWhereUniqueWithoutSubjectInput | ScoreRecordUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: ScoreRecordCreateManySubjectInputEnvelope
    set?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    disconnect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    delete?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    update?: ScoreRecordUpdateWithWhereUniqueWithoutSubjectInput | ScoreRecordUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: ScoreRecordUpdateManyWithWhereWithoutSubjectInput | ScoreRecordUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: ScoreRecordScalarWhereInput | ScoreRecordScalarWhereInput[]
  }

  export type SubjectCreateNestedOneWithoutCpsInput = {
    create?: XOR<SubjectCreateWithoutCpsInput, SubjectUncheckedCreateWithoutCpsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCpsInput
    connect?: SubjectWhereUniqueInput
  }

  export type TPCreateNestedManyWithoutCpInput = {
    create?: XOR<TPCreateWithoutCpInput, TPUncheckedCreateWithoutCpInput> | TPCreateWithoutCpInput[] | TPUncheckedCreateWithoutCpInput[]
    connectOrCreate?: TPCreateOrConnectWithoutCpInput | TPCreateOrConnectWithoutCpInput[]
    createMany?: TPCreateManyCpInputEnvelope
    connect?: TPWhereUniqueInput | TPWhereUniqueInput[]
  }

  export type TPUncheckedCreateNestedManyWithoutCpInput = {
    create?: XOR<TPCreateWithoutCpInput, TPUncheckedCreateWithoutCpInput> | TPCreateWithoutCpInput[] | TPUncheckedCreateWithoutCpInput[]
    connectOrCreate?: TPCreateOrConnectWithoutCpInput | TPCreateOrConnectWithoutCpInput[]
    createMany?: TPCreateManyCpInputEnvelope
    connect?: TPWhereUniqueInput | TPWhereUniqueInput[]
  }

  export type SubjectUpdateOneRequiredWithoutCpsNestedInput = {
    create?: XOR<SubjectCreateWithoutCpsInput, SubjectUncheckedCreateWithoutCpsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCpsInput
    upsert?: SubjectUpsertWithoutCpsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutCpsInput, SubjectUpdateWithoutCpsInput>, SubjectUncheckedUpdateWithoutCpsInput>
  }

  export type TPUpdateManyWithoutCpNestedInput = {
    create?: XOR<TPCreateWithoutCpInput, TPUncheckedCreateWithoutCpInput> | TPCreateWithoutCpInput[] | TPUncheckedCreateWithoutCpInput[]
    connectOrCreate?: TPCreateOrConnectWithoutCpInput | TPCreateOrConnectWithoutCpInput[]
    upsert?: TPUpsertWithWhereUniqueWithoutCpInput | TPUpsertWithWhereUniqueWithoutCpInput[]
    createMany?: TPCreateManyCpInputEnvelope
    set?: TPWhereUniqueInput | TPWhereUniqueInput[]
    disconnect?: TPWhereUniqueInput | TPWhereUniqueInput[]
    delete?: TPWhereUniqueInput | TPWhereUniqueInput[]
    connect?: TPWhereUniqueInput | TPWhereUniqueInput[]
    update?: TPUpdateWithWhereUniqueWithoutCpInput | TPUpdateWithWhereUniqueWithoutCpInput[]
    updateMany?: TPUpdateManyWithWhereWithoutCpInput | TPUpdateManyWithWhereWithoutCpInput[]
    deleteMany?: TPScalarWhereInput | TPScalarWhereInput[]
  }

  export type TPUncheckedUpdateManyWithoutCpNestedInput = {
    create?: XOR<TPCreateWithoutCpInput, TPUncheckedCreateWithoutCpInput> | TPCreateWithoutCpInput[] | TPUncheckedCreateWithoutCpInput[]
    connectOrCreate?: TPCreateOrConnectWithoutCpInput | TPCreateOrConnectWithoutCpInput[]
    upsert?: TPUpsertWithWhereUniqueWithoutCpInput | TPUpsertWithWhereUniqueWithoutCpInput[]
    createMany?: TPCreateManyCpInputEnvelope
    set?: TPWhereUniqueInput | TPWhereUniqueInput[]
    disconnect?: TPWhereUniqueInput | TPWhereUniqueInput[]
    delete?: TPWhereUniqueInput | TPWhereUniqueInput[]
    connect?: TPWhereUniqueInput | TPWhereUniqueInput[]
    update?: TPUpdateWithWhereUniqueWithoutCpInput | TPUpdateWithWhereUniqueWithoutCpInput[]
    updateMany?: TPUpdateManyWithWhereWithoutCpInput | TPUpdateManyWithWhereWithoutCpInput[]
    deleteMany?: TPScalarWhereInput | TPScalarWhereInput[]
  }

  export type CPCreateNestedOneWithoutTpsInput = {
    create?: XOR<CPCreateWithoutTpsInput, CPUncheckedCreateWithoutTpsInput>
    connectOrCreate?: CPCreateOrConnectWithoutTpsInput
    connect?: CPWhereUniqueInput
  }

  export type AssessmentCreateNestedManyWithoutTpInput = {
    create?: XOR<AssessmentCreateWithoutTpInput, AssessmentUncheckedCreateWithoutTpInput> | AssessmentCreateWithoutTpInput[] | AssessmentUncheckedCreateWithoutTpInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutTpInput | AssessmentCreateOrConnectWithoutTpInput[]
    createMany?: AssessmentCreateManyTpInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type AssessmentUncheckedCreateNestedManyWithoutTpInput = {
    create?: XOR<AssessmentCreateWithoutTpInput, AssessmentUncheckedCreateWithoutTpInput> | AssessmentCreateWithoutTpInput[] | AssessmentUncheckedCreateWithoutTpInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutTpInput | AssessmentCreateOrConnectWithoutTpInput[]
    createMany?: AssessmentCreateManyTpInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type CPUpdateOneRequiredWithoutTpsNestedInput = {
    create?: XOR<CPCreateWithoutTpsInput, CPUncheckedCreateWithoutTpsInput>
    connectOrCreate?: CPCreateOrConnectWithoutTpsInput
    upsert?: CPUpsertWithoutTpsInput
    connect?: CPWhereUniqueInput
    update?: XOR<XOR<CPUpdateToOneWithWhereWithoutTpsInput, CPUpdateWithoutTpsInput>, CPUncheckedUpdateWithoutTpsInput>
  }

  export type AssessmentUpdateManyWithoutTpNestedInput = {
    create?: XOR<AssessmentCreateWithoutTpInput, AssessmentUncheckedCreateWithoutTpInput> | AssessmentCreateWithoutTpInput[] | AssessmentUncheckedCreateWithoutTpInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutTpInput | AssessmentCreateOrConnectWithoutTpInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutTpInput | AssessmentUpsertWithWhereUniqueWithoutTpInput[]
    createMany?: AssessmentCreateManyTpInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutTpInput | AssessmentUpdateWithWhereUniqueWithoutTpInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutTpInput | AssessmentUpdateManyWithWhereWithoutTpInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type AssessmentUncheckedUpdateManyWithoutTpNestedInput = {
    create?: XOR<AssessmentCreateWithoutTpInput, AssessmentUncheckedCreateWithoutTpInput> | AssessmentCreateWithoutTpInput[] | AssessmentUncheckedCreateWithoutTpInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutTpInput | AssessmentCreateOrConnectWithoutTpInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutTpInput | AssessmentUpsertWithWhereUniqueWithoutTpInput[]
    createMany?: AssessmentCreateManyTpInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutTpInput | AssessmentUpdateWithWhereUniqueWithoutTpInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutTpInput | AssessmentUpdateManyWithWhereWithoutTpInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type AssessmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<AssessmentCreateWithoutStudentInput, AssessmentUncheckedCreateWithoutStudentInput> | AssessmentCreateWithoutStudentInput[] | AssessmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutStudentInput | AssessmentCreateOrConnectWithoutStudentInput[]
    createMany?: AssessmentCreateManyStudentInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type AttendanceCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type HomeroomNoteCreateNestedOneWithoutStudentInput = {
    create?: XOR<HomeroomNoteCreateWithoutStudentInput, HomeroomNoteUncheckedCreateWithoutStudentInput>
    connectOrCreate?: HomeroomNoteCreateOrConnectWithoutStudentInput
    connect?: HomeroomNoteWhereUniqueInput
  }

  export type PersonalityCreateNestedOneWithoutStudentInput = {
    create?: XOR<PersonalityCreateWithoutStudentInput, PersonalityUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalityCreateOrConnectWithoutStudentInput
    connect?: PersonalityWhereUniqueInput
  }

  export type ScoreRecordCreateNestedManyWithoutStudentInput = {
    create?: XOR<ScoreRecordCreateWithoutStudentInput, ScoreRecordUncheckedCreateWithoutStudentInput> | ScoreRecordCreateWithoutStudentInput[] | ScoreRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutStudentInput | ScoreRecordCreateOrConnectWithoutStudentInput[]
    createMany?: ScoreRecordCreateManyStudentInputEnvelope
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
  }

  export type TahfidzCreateNestedManyWithoutStudentInput = {
    create?: XOR<TahfidzCreateWithoutStudentInput, TahfidzUncheckedCreateWithoutStudentInput> | TahfidzCreateWithoutStudentInput[] | TahfidzUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TahfidzCreateOrConnectWithoutStudentInput | TahfidzCreateOrConnectWithoutStudentInput[]
    createMany?: TahfidzCreateManyStudentInputEnvelope
    connect?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
  }

  export type AssessmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AssessmentCreateWithoutStudentInput, AssessmentUncheckedCreateWithoutStudentInput> | AssessmentCreateWithoutStudentInput[] | AssessmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutStudentInput | AssessmentCreateOrConnectWithoutStudentInput[]
    createMany?: AssessmentCreateManyStudentInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type HomeroomNoteUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<HomeroomNoteCreateWithoutStudentInput, HomeroomNoteUncheckedCreateWithoutStudentInput>
    connectOrCreate?: HomeroomNoteCreateOrConnectWithoutStudentInput
    connect?: HomeroomNoteWhereUniqueInput
  }

  export type PersonalityUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<PersonalityCreateWithoutStudentInput, PersonalityUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalityCreateOrConnectWithoutStudentInput
    connect?: PersonalityWhereUniqueInput
  }

  export type ScoreRecordUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<ScoreRecordCreateWithoutStudentInput, ScoreRecordUncheckedCreateWithoutStudentInput> | ScoreRecordCreateWithoutStudentInput[] | ScoreRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutStudentInput | ScoreRecordCreateOrConnectWithoutStudentInput[]
    createMany?: ScoreRecordCreateManyStudentInputEnvelope
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
  }

  export type TahfidzUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<TahfidzCreateWithoutStudentInput, TahfidzUncheckedCreateWithoutStudentInput> | TahfidzCreateWithoutStudentInput[] | TahfidzUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TahfidzCreateOrConnectWithoutStudentInput | TahfidzCreateOrConnectWithoutStudentInput[]
    createMany?: TahfidzCreateManyStudentInputEnvelope
    connect?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
  }

  export type AssessmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AssessmentCreateWithoutStudentInput, AssessmentUncheckedCreateWithoutStudentInput> | AssessmentCreateWithoutStudentInput[] | AssessmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutStudentInput | AssessmentCreateOrConnectWithoutStudentInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutStudentInput | AssessmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AssessmentCreateManyStudentInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutStudentInput | AssessmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutStudentInput | AssessmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type AttendanceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutStudentInput | AttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutStudentInput | AttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutStudentInput | AttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type HomeroomNoteUpdateOneWithoutStudentNestedInput = {
    create?: XOR<HomeroomNoteCreateWithoutStudentInput, HomeroomNoteUncheckedCreateWithoutStudentInput>
    connectOrCreate?: HomeroomNoteCreateOrConnectWithoutStudentInput
    upsert?: HomeroomNoteUpsertWithoutStudentInput
    disconnect?: HomeroomNoteWhereInput | boolean
    delete?: HomeroomNoteWhereInput | boolean
    connect?: HomeroomNoteWhereUniqueInput
    update?: XOR<XOR<HomeroomNoteUpdateToOneWithWhereWithoutStudentInput, HomeroomNoteUpdateWithoutStudentInput>, HomeroomNoteUncheckedUpdateWithoutStudentInput>
  }

  export type PersonalityUpdateOneWithoutStudentNestedInput = {
    create?: XOR<PersonalityCreateWithoutStudentInput, PersonalityUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalityCreateOrConnectWithoutStudentInput
    upsert?: PersonalityUpsertWithoutStudentInput
    disconnect?: PersonalityWhereInput | boolean
    delete?: PersonalityWhereInput | boolean
    connect?: PersonalityWhereUniqueInput
    update?: XOR<XOR<PersonalityUpdateToOneWithWhereWithoutStudentInput, PersonalityUpdateWithoutStudentInput>, PersonalityUncheckedUpdateWithoutStudentInput>
  }

  export type ScoreRecordUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ScoreRecordCreateWithoutStudentInput, ScoreRecordUncheckedCreateWithoutStudentInput> | ScoreRecordCreateWithoutStudentInput[] | ScoreRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutStudentInput | ScoreRecordCreateOrConnectWithoutStudentInput[]
    upsert?: ScoreRecordUpsertWithWhereUniqueWithoutStudentInput | ScoreRecordUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ScoreRecordCreateManyStudentInputEnvelope
    set?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    disconnect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    delete?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    update?: ScoreRecordUpdateWithWhereUniqueWithoutStudentInput | ScoreRecordUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ScoreRecordUpdateManyWithWhereWithoutStudentInput | ScoreRecordUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ScoreRecordScalarWhereInput | ScoreRecordScalarWhereInput[]
  }

  export type TahfidzUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TahfidzCreateWithoutStudentInput, TahfidzUncheckedCreateWithoutStudentInput> | TahfidzCreateWithoutStudentInput[] | TahfidzUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TahfidzCreateOrConnectWithoutStudentInput | TahfidzCreateOrConnectWithoutStudentInput[]
    upsert?: TahfidzUpsertWithWhereUniqueWithoutStudentInput | TahfidzUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TahfidzCreateManyStudentInputEnvelope
    set?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    disconnect?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    delete?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    connect?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    update?: TahfidzUpdateWithWhereUniqueWithoutStudentInput | TahfidzUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TahfidzUpdateManyWithWhereWithoutStudentInput | TahfidzUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TahfidzScalarWhereInput | TahfidzScalarWhereInput[]
  }

  export type AssessmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AssessmentCreateWithoutStudentInput, AssessmentUncheckedCreateWithoutStudentInput> | AssessmentCreateWithoutStudentInput[] | AssessmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutStudentInput | AssessmentCreateOrConnectWithoutStudentInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutStudentInput | AssessmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AssessmentCreateManyStudentInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutStudentInput | AssessmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutStudentInput | AssessmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutStudentInput | AttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutStudentInput | AttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutStudentInput | AttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type HomeroomNoteUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<HomeroomNoteCreateWithoutStudentInput, HomeroomNoteUncheckedCreateWithoutStudentInput>
    connectOrCreate?: HomeroomNoteCreateOrConnectWithoutStudentInput
    upsert?: HomeroomNoteUpsertWithoutStudentInput
    disconnect?: HomeroomNoteWhereInput | boolean
    delete?: HomeroomNoteWhereInput | boolean
    connect?: HomeroomNoteWhereUniqueInput
    update?: XOR<XOR<HomeroomNoteUpdateToOneWithWhereWithoutStudentInput, HomeroomNoteUpdateWithoutStudentInput>, HomeroomNoteUncheckedUpdateWithoutStudentInput>
  }

  export type PersonalityUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<PersonalityCreateWithoutStudentInput, PersonalityUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PersonalityCreateOrConnectWithoutStudentInput
    upsert?: PersonalityUpsertWithoutStudentInput
    disconnect?: PersonalityWhereInput | boolean
    delete?: PersonalityWhereInput | boolean
    connect?: PersonalityWhereUniqueInput
    update?: XOR<XOR<PersonalityUpdateToOneWithWhereWithoutStudentInput, PersonalityUpdateWithoutStudentInput>, PersonalityUncheckedUpdateWithoutStudentInput>
  }

  export type ScoreRecordUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<ScoreRecordCreateWithoutStudentInput, ScoreRecordUncheckedCreateWithoutStudentInput> | ScoreRecordCreateWithoutStudentInput[] | ScoreRecordUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: ScoreRecordCreateOrConnectWithoutStudentInput | ScoreRecordCreateOrConnectWithoutStudentInput[]
    upsert?: ScoreRecordUpsertWithWhereUniqueWithoutStudentInput | ScoreRecordUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: ScoreRecordCreateManyStudentInputEnvelope
    set?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    disconnect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    delete?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    connect?: ScoreRecordWhereUniqueInput | ScoreRecordWhereUniqueInput[]
    update?: ScoreRecordUpdateWithWhereUniqueWithoutStudentInput | ScoreRecordUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: ScoreRecordUpdateManyWithWhereWithoutStudentInput | ScoreRecordUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: ScoreRecordScalarWhereInput | ScoreRecordScalarWhereInput[]
  }

  export type TahfidzUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<TahfidzCreateWithoutStudentInput, TahfidzUncheckedCreateWithoutStudentInput> | TahfidzCreateWithoutStudentInput[] | TahfidzUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: TahfidzCreateOrConnectWithoutStudentInput | TahfidzCreateOrConnectWithoutStudentInput[]
    upsert?: TahfidzUpsertWithWhereUniqueWithoutStudentInput | TahfidzUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: TahfidzCreateManyStudentInputEnvelope
    set?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    disconnect?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    delete?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    connect?: TahfidzWhereUniqueInput | TahfidzWhereUniqueInput[]
    update?: TahfidzUpdateWithWhereUniqueWithoutStudentInput | TahfidzUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: TahfidzUpdateManyWithWhereWithoutStudentInput | TahfidzUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: TahfidzScalarWhereInput | TahfidzScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutAssessmentsInput = {
    create?: XOR<StudentCreateWithoutAssessmentsInput, StudentUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAssessmentsInput
    connect?: StudentWhereUniqueInput
  }

  export type TPCreateNestedOneWithoutAssessmentsInput = {
    create?: XOR<TPCreateWithoutAssessmentsInput, TPUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: TPCreateOrConnectWithoutAssessmentsInput
    connect?: TPWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutAssessmentsNestedInput = {
    create?: XOR<StudentCreateWithoutAssessmentsInput, StudentUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAssessmentsInput
    upsert?: StudentUpsertWithoutAssessmentsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAssessmentsInput, StudentUpdateWithoutAssessmentsInput>, StudentUncheckedUpdateWithoutAssessmentsInput>
  }

  export type TPUpdateOneRequiredWithoutAssessmentsNestedInput = {
    create?: XOR<TPCreateWithoutAssessmentsInput, TPUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: TPCreateOrConnectWithoutAssessmentsInput
    upsert?: TPUpsertWithoutAssessmentsInput
    connect?: TPWhereUniqueInput
    update?: XOR<XOR<TPUpdateToOneWithWhereWithoutAssessmentsInput, TPUpdateWithoutAssessmentsInput>, TPUncheckedUpdateWithoutAssessmentsInput>
  }

  export type StudentCreateNestedOneWithoutTahfidzsInput = {
    create?: XOR<StudentCreateWithoutTahfidzsInput, StudentUncheckedCreateWithoutTahfidzsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTahfidzsInput
    connect?: StudentWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentUpdateOneRequiredWithoutTahfidzsNestedInput = {
    create?: XOR<StudentCreateWithoutTahfidzsInput, StudentUncheckedCreateWithoutTahfidzsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutTahfidzsInput
    upsert?: StudentUpsertWithoutTahfidzsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutTahfidzsInput, StudentUpdateWithoutTahfidzsInput>, StudentUncheckedUpdateWithoutTahfidzsInput>
  }

  export type StudentCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendancesInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendancesInput
    upsert?: StudentUpsertWithoutAttendancesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAttendancesInput, StudentUpdateWithoutAttendancesInput>, StudentUncheckedUpdateWithoutAttendancesInput>
  }

  export type TeacherCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAssignmentsInput
    connect?: TeacherWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutAssignmentsInput
    connect?: SubjectWhereUniqueInput
  }

  export type TeacherUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAssignmentsInput
    upsert?: TeacherUpsertWithoutAssignmentsInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutAssignmentsInput, TeacherUpdateWithoutAssignmentsInput>, TeacherUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubjectUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutAssignmentsInput
    upsert?: SubjectUpsertWithoutAssignmentsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutAssignmentsInput, SubjectUpdateWithoutAssignmentsInput>, SubjectUncheckedUpdateWithoutAssignmentsInput>
  }

  export type StudentCreateNestedOneWithoutScoreRecordsInput = {
    create?: XOR<StudentCreateWithoutScoreRecordsInput, StudentUncheckedCreateWithoutScoreRecordsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutScoreRecordsInput
    connect?: StudentWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutScoreRecordsInput = {
    create?: XOR<SubjectCreateWithoutScoreRecordsInput, SubjectUncheckedCreateWithoutScoreRecordsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutScoreRecordsInput
    connect?: SubjectWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutScoreRecordsNestedInput = {
    create?: XOR<StudentCreateWithoutScoreRecordsInput, StudentUncheckedCreateWithoutScoreRecordsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutScoreRecordsInput
    upsert?: StudentUpsertWithoutScoreRecordsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutScoreRecordsInput, StudentUpdateWithoutScoreRecordsInput>, StudentUncheckedUpdateWithoutScoreRecordsInput>
  }

  export type SubjectUpdateOneRequiredWithoutScoreRecordsNestedInput = {
    create?: XOR<SubjectCreateWithoutScoreRecordsInput, SubjectUncheckedCreateWithoutScoreRecordsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutScoreRecordsInput
    upsert?: SubjectUpsertWithoutScoreRecordsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutScoreRecordsInput, SubjectUpdateWithoutScoreRecordsInput>, SubjectUncheckedUpdateWithoutScoreRecordsInput>
  }

  export type StudentCreateNestedOneWithoutPersonalityInput = {
    create?: XOR<StudentCreateWithoutPersonalityInput, StudentUncheckedCreateWithoutPersonalityInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPersonalityInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutPersonalityNestedInput = {
    create?: XOR<StudentCreateWithoutPersonalityInput, StudentUncheckedCreateWithoutPersonalityInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPersonalityInput
    upsert?: StudentUpsertWithoutPersonalityInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPersonalityInput, StudentUpdateWithoutPersonalityInput>, StudentUncheckedUpdateWithoutPersonalityInput>
  }

  export type StudentCreateNestedOneWithoutHomeroomNoteInput = {
    create?: XOR<StudentCreateWithoutHomeroomNoteInput, StudentUncheckedCreateWithoutHomeroomNoteInput>
    connectOrCreate?: StudentCreateOrConnectWithoutHomeroomNoteInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutHomeroomNoteNestedInput = {
    create?: XOR<StudentCreateWithoutHomeroomNoteInput, StudentUncheckedCreateWithoutHomeroomNoteInput>
    connectOrCreate?: StudentCreateOrConnectWithoutHomeroomNoteInput
    upsert?: StudentUpsertWithoutHomeroomNoteInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutHomeroomNoteInput, StudentUpdateWithoutHomeroomNoteInput>, StudentUncheckedUpdateWithoutHomeroomNoteInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AssignmentCreateWithoutTeacherInput = {
    className: string
    academicYear?: string
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
  }

  export type AssignmentUncheckedCreateWithoutTeacherInput = {
    id?: number
    subjectId: number
    className: string
    academicYear?: string
  }

  export type AssignmentCreateOrConnectWithoutTeacherInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutTeacherInput, AssignmentUncheckedCreateWithoutTeacherInput>
  }

  export type AssignmentCreateManyTeacherInputEnvelope = {
    data: AssignmentCreateManyTeacherInput | AssignmentCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type SubjectCreateWithoutTeacherInput = {
    name: string
    assignments?: AssignmentCreateNestedManyWithoutSubjectInput
    cps?: CPCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutTeacherInput = {
    id?: number
    name: string
    assignments?: AssignmentUncheckedCreateNestedManyWithoutSubjectInput
    cps?: CPUncheckedCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutTeacherInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutTeacherInput, SubjectUncheckedCreateWithoutTeacherInput>
  }

  export type SubjectCreateManyTeacherInputEnvelope = {
    data: SubjectCreateManyTeacherInput | SubjectCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type AssignmentUpsertWithWhereUniqueWithoutTeacherInput = {
    where: AssignmentWhereUniqueInput
    update: XOR<AssignmentUpdateWithoutTeacherInput, AssignmentUncheckedUpdateWithoutTeacherInput>
    create: XOR<AssignmentCreateWithoutTeacherInput, AssignmentUncheckedCreateWithoutTeacherInput>
  }

  export type AssignmentUpdateWithWhereUniqueWithoutTeacherInput = {
    where: AssignmentWhereUniqueInput
    data: XOR<AssignmentUpdateWithoutTeacherInput, AssignmentUncheckedUpdateWithoutTeacherInput>
  }

  export type AssignmentUpdateManyWithWhereWithoutTeacherInput = {
    where: AssignmentScalarWhereInput
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyWithoutTeacherInput>
  }

  export type AssignmentScalarWhereInput = {
    AND?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    OR?: AssignmentScalarWhereInput[]
    NOT?: AssignmentScalarWhereInput | AssignmentScalarWhereInput[]
    id?: IntFilter<"Assignment"> | number
    teacherId?: IntFilter<"Assignment"> | number
    subjectId?: IntFilter<"Assignment"> | number
    className?: StringFilter<"Assignment"> | string
    academicYear?: StringFilter<"Assignment"> | string
  }

  export type SubjectUpsertWithWhereUniqueWithoutTeacherInput = {
    where: SubjectWhereUniqueInput
    update: XOR<SubjectUpdateWithoutTeacherInput, SubjectUncheckedUpdateWithoutTeacherInput>
    create: XOR<SubjectCreateWithoutTeacherInput, SubjectUncheckedCreateWithoutTeacherInput>
  }

  export type SubjectUpdateWithWhereUniqueWithoutTeacherInput = {
    where: SubjectWhereUniqueInput
    data: XOR<SubjectUpdateWithoutTeacherInput, SubjectUncheckedUpdateWithoutTeacherInput>
  }

  export type SubjectUpdateManyWithWhereWithoutTeacherInput = {
    where: SubjectScalarWhereInput
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyWithoutTeacherInput>
  }

  export type SubjectScalarWhereInput = {
    AND?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    OR?: SubjectScalarWhereInput[]
    NOT?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    id?: IntFilter<"Subject"> | number
    name?: StringFilter<"Subject"> | string
    teacherId?: IntFilter<"Subject"> | number
  }

  export type TeacherCreateWithoutSubjectsInput = {
    identity_number: string
    password: string
    fullname: string
    birth_date?: string | null
    education?: string | null
    address?: string | null
    role?: string
    assignments?: AssignmentCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutSubjectsInput = {
    id?: number
    identity_number: string
    password: string
    fullname: string
    birth_date?: string | null
    education?: string | null
    address?: string | null
    role?: string
    assignments?: AssignmentUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutSubjectsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput>
  }

  export type AssignmentCreateWithoutSubjectInput = {
    className: string
    academicYear?: string
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
  }

  export type AssignmentUncheckedCreateWithoutSubjectInput = {
    id?: number
    teacherId: number
    className: string
    academicYear?: string
  }

  export type AssignmentCreateOrConnectWithoutSubjectInput = {
    where: AssignmentWhereUniqueInput
    create: XOR<AssignmentCreateWithoutSubjectInput, AssignmentUncheckedCreateWithoutSubjectInput>
  }

  export type AssignmentCreateManySubjectInputEnvelope = {
    data: AssignmentCreateManySubjectInput | AssignmentCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type CPCreateWithoutSubjectInput = {
    code: string
    description: string
    tps?: TPCreateNestedManyWithoutCpInput
  }

  export type CPUncheckedCreateWithoutSubjectInput = {
    id?: number
    code: string
    description: string
    tps?: TPUncheckedCreateNestedManyWithoutCpInput
  }

  export type CPCreateOrConnectWithoutSubjectInput = {
    where: CPWhereUniqueInput
    create: XOR<CPCreateWithoutSubjectInput, CPUncheckedCreateWithoutSubjectInput>
  }

  export type CPCreateManySubjectInputEnvelope = {
    data: CPCreateManySubjectInput | CPCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type ScoreRecordCreateWithoutSubjectInput = {
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
    student: StudentCreateNestedOneWithoutScoreRecordsInput
  }

  export type ScoreRecordUncheckedCreateWithoutSubjectInput = {
    id?: number
    studentId: number
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
  }

  export type ScoreRecordCreateOrConnectWithoutSubjectInput = {
    where: ScoreRecordWhereUniqueInput
    create: XOR<ScoreRecordCreateWithoutSubjectInput, ScoreRecordUncheckedCreateWithoutSubjectInput>
  }

  export type ScoreRecordCreateManySubjectInputEnvelope = {
    data: ScoreRecordCreateManySubjectInput | ScoreRecordCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type TeacherUpsertWithoutSubjectsInput = {
    update: XOR<TeacherUpdateWithoutSubjectsInput, TeacherUncheckedUpdateWithoutSubjectsInput>
    create: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutSubjectsInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutSubjectsInput, TeacherUncheckedUpdateWithoutSubjectsInput>
  }

  export type TeacherUpdateWithoutSubjectsInput = {
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignments?: AssignmentUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutSubjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    assignments?: AssignmentUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type AssignmentUpsertWithWhereUniqueWithoutSubjectInput = {
    where: AssignmentWhereUniqueInput
    update: XOR<AssignmentUpdateWithoutSubjectInput, AssignmentUncheckedUpdateWithoutSubjectInput>
    create: XOR<AssignmentCreateWithoutSubjectInput, AssignmentUncheckedCreateWithoutSubjectInput>
  }

  export type AssignmentUpdateWithWhereUniqueWithoutSubjectInput = {
    where: AssignmentWhereUniqueInput
    data: XOR<AssignmentUpdateWithoutSubjectInput, AssignmentUncheckedUpdateWithoutSubjectInput>
  }

  export type AssignmentUpdateManyWithWhereWithoutSubjectInput = {
    where: AssignmentScalarWhereInput
    data: XOR<AssignmentUpdateManyMutationInput, AssignmentUncheckedUpdateManyWithoutSubjectInput>
  }

  export type CPUpsertWithWhereUniqueWithoutSubjectInput = {
    where: CPWhereUniqueInput
    update: XOR<CPUpdateWithoutSubjectInput, CPUncheckedUpdateWithoutSubjectInput>
    create: XOR<CPCreateWithoutSubjectInput, CPUncheckedCreateWithoutSubjectInput>
  }

  export type CPUpdateWithWhereUniqueWithoutSubjectInput = {
    where: CPWhereUniqueInput
    data: XOR<CPUpdateWithoutSubjectInput, CPUncheckedUpdateWithoutSubjectInput>
  }

  export type CPUpdateManyWithWhereWithoutSubjectInput = {
    where: CPScalarWhereInput
    data: XOR<CPUpdateManyMutationInput, CPUncheckedUpdateManyWithoutSubjectInput>
  }

  export type CPScalarWhereInput = {
    AND?: CPScalarWhereInput | CPScalarWhereInput[]
    OR?: CPScalarWhereInput[]
    NOT?: CPScalarWhereInput | CPScalarWhereInput[]
    id?: IntFilter<"CP"> | number
    code?: StringFilter<"CP"> | string
    description?: StringFilter<"CP"> | string
    subjectId?: IntFilter<"CP"> | number
  }

  export type ScoreRecordUpsertWithWhereUniqueWithoutSubjectInput = {
    where: ScoreRecordWhereUniqueInput
    update: XOR<ScoreRecordUpdateWithoutSubjectInput, ScoreRecordUncheckedUpdateWithoutSubjectInput>
    create: XOR<ScoreRecordCreateWithoutSubjectInput, ScoreRecordUncheckedCreateWithoutSubjectInput>
  }

  export type ScoreRecordUpdateWithWhereUniqueWithoutSubjectInput = {
    where: ScoreRecordWhereUniqueInput
    data: XOR<ScoreRecordUpdateWithoutSubjectInput, ScoreRecordUncheckedUpdateWithoutSubjectInput>
  }

  export type ScoreRecordUpdateManyWithWhereWithoutSubjectInput = {
    where: ScoreRecordScalarWhereInput
    data: XOR<ScoreRecordUpdateManyMutationInput, ScoreRecordUncheckedUpdateManyWithoutSubjectInput>
  }

  export type ScoreRecordScalarWhereInput = {
    AND?: ScoreRecordScalarWhereInput | ScoreRecordScalarWhereInput[]
    OR?: ScoreRecordScalarWhereInput[]
    NOT?: ScoreRecordScalarWhereInput | ScoreRecordScalarWhereInput[]
    id?: IntFilter<"ScoreRecord"> | number
    studentId?: IntFilter<"ScoreRecord"> | number
    subjectId?: IntFilter<"ScoreRecord"> | number
    className?: StringFilter<"ScoreRecord"> | string
    type?: StringFilter<"ScoreRecord"> | string
    scoreNumber?: IntFilter<"ScoreRecord"> | number
    scoreText?: StringFilter<"ScoreRecord"> | string
  }

  export type SubjectCreateWithoutCpsInput = {
    name: string
    teacher: TeacherCreateNestedOneWithoutSubjectsInput
    assignments?: AssignmentCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutCpsInput = {
    id?: number
    name: string
    teacherId: number
    assignments?: AssignmentUncheckedCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutCpsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutCpsInput, SubjectUncheckedCreateWithoutCpsInput>
  }

  export type TPCreateWithoutCpInput = {
    code: string
    description: string
    assessments?: AssessmentCreateNestedManyWithoutTpInput
  }

  export type TPUncheckedCreateWithoutCpInput = {
    id?: number
    code: string
    description: string
    assessments?: AssessmentUncheckedCreateNestedManyWithoutTpInput
  }

  export type TPCreateOrConnectWithoutCpInput = {
    where: TPWhereUniqueInput
    create: XOR<TPCreateWithoutCpInput, TPUncheckedCreateWithoutCpInput>
  }

  export type TPCreateManyCpInputEnvelope = {
    data: TPCreateManyCpInput | TPCreateManyCpInput[]
    skipDuplicates?: boolean
  }

  export type SubjectUpsertWithoutCpsInput = {
    update: XOR<SubjectUpdateWithoutCpsInput, SubjectUncheckedUpdateWithoutCpsInput>
    create: XOR<SubjectCreateWithoutCpsInput, SubjectUncheckedCreateWithoutCpsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutCpsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutCpsInput, SubjectUncheckedUpdateWithoutCpsInput>
  }

  export type SubjectUpdateWithoutCpsInput = {
    name?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutSubjectsNestedInput
    assignments?: AssignmentUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutCpsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    assignments?: AssignmentUncheckedUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type TPUpsertWithWhereUniqueWithoutCpInput = {
    where: TPWhereUniqueInput
    update: XOR<TPUpdateWithoutCpInput, TPUncheckedUpdateWithoutCpInput>
    create: XOR<TPCreateWithoutCpInput, TPUncheckedCreateWithoutCpInput>
  }

  export type TPUpdateWithWhereUniqueWithoutCpInput = {
    where: TPWhereUniqueInput
    data: XOR<TPUpdateWithoutCpInput, TPUncheckedUpdateWithoutCpInput>
  }

  export type TPUpdateManyWithWhereWithoutCpInput = {
    where: TPScalarWhereInput
    data: XOR<TPUpdateManyMutationInput, TPUncheckedUpdateManyWithoutCpInput>
  }

  export type TPScalarWhereInput = {
    AND?: TPScalarWhereInput | TPScalarWhereInput[]
    OR?: TPScalarWhereInput[]
    NOT?: TPScalarWhereInput | TPScalarWhereInput[]
    id?: IntFilter<"TP"> | number
    code?: StringFilter<"TP"> | string
    description?: StringFilter<"TP"> | string
    cpId?: IntFilter<"TP"> | number
  }

  export type CPCreateWithoutTpsInput = {
    code: string
    description: string
    subject: SubjectCreateNestedOneWithoutCpsInput
  }

  export type CPUncheckedCreateWithoutTpsInput = {
    id?: number
    code: string
    description: string
    subjectId: number
  }

  export type CPCreateOrConnectWithoutTpsInput = {
    where: CPWhereUniqueInput
    create: XOR<CPCreateWithoutTpsInput, CPUncheckedCreateWithoutTpsInput>
  }

  export type AssessmentCreateWithoutTpInput = {
    score: number
    type: string
    student: StudentCreateNestedOneWithoutAssessmentsInput
  }

  export type AssessmentUncheckedCreateWithoutTpInput = {
    id?: number
    studentId: number
    score: number
    type: string
  }

  export type AssessmentCreateOrConnectWithoutTpInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutTpInput, AssessmentUncheckedCreateWithoutTpInput>
  }

  export type AssessmentCreateManyTpInputEnvelope = {
    data: AssessmentCreateManyTpInput | AssessmentCreateManyTpInput[]
    skipDuplicates?: boolean
  }

  export type CPUpsertWithoutTpsInput = {
    update: XOR<CPUpdateWithoutTpsInput, CPUncheckedUpdateWithoutTpsInput>
    create: XOR<CPCreateWithoutTpsInput, CPUncheckedCreateWithoutTpsInput>
    where?: CPWhereInput
  }

  export type CPUpdateToOneWithWhereWithoutTpsInput = {
    where?: CPWhereInput
    data: XOR<CPUpdateWithoutTpsInput, CPUncheckedUpdateWithoutTpsInput>
  }

  export type CPUpdateWithoutTpsInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    subject?: SubjectUpdateOneRequiredWithoutCpsNestedInput
  }

  export type CPUncheckedUpdateWithoutTpsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    subjectId?: IntFieldUpdateOperationsInput | number
  }

  export type AssessmentUpsertWithWhereUniqueWithoutTpInput = {
    where: AssessmentWhereUniqueInput
    update: XOR<AssessmentUpdateWithoutTpInput, AssessmentUncheckedUpdateWithoutTpInput>
    create: XOR<AssessmentCreateWithoutTpInput, AssessmentUncheckedCreateWithoutTpInput>
  }

  export type AssessmentUpdateWithWhereUniqueWithoutTpInput = {
    where: AssessmentWhereUniqueInput
    data: XOR<AssessmentUpdateWithoutTpInput, AssessmentUncheckedUpdateWithoutTpInput>
  }

  export type AssessmentUpdateManyWithWhereWithoutTpInput = {
    where: AssessmentScalarWhereInput
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyWithoutTpInput>
  }

  export type AssessmentScalarWhereInput = {
    AND?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    OR?: AssessmentScalarWhereInput[]
    NOT?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    id?: IntFilter<"Assessment"> | number
    studentId?: IntFilter<"Assessment"> | number
    tpId?: IntFilter<"Assessment"> | number
    score?: IntFilter<"Assessment"> | number
    type?: StringFilter<"Assessment"> | string
  }

  export type AssessmentCreateWithoutStudentInput = {
    score: number
    type: string
    tp: TPCreateNestedOneWithoutAssessmentsInput
  }

  export type AssessmentUncheckedCreateWithoutStudentInput = {
    id?: number
    tpId: number
    score: number
    type: string
  }

  export type AssessmentCreateOrConnectWithoutStudentInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutStudentInput, AssessmentUncheckedCreateWithoutStudentInput>
  }

  export type AssessmentCreateManyStudentInputEnvelope = {
    data: AssessmentCreateManyStudentInput | AssessmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceCreateWithoutStudentInput = {
    status: string
    date?: Date | string
  }

  export type AttendanceUncheckedCreateWithoutStudentInput = {
    id?: number
    status: string
    date?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput>
  }

  export type AttendanceCreateManyStudentInputEnvelope = {
    data: AttendanceCreateManyStudentInput | AttendanceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type HomeroomNoteCreateWithoutStudentInput = {
    className: string
    note?: string
    updatedAt?: Date | string
  }

  export type HomeroomNoteUncheckedCreateWithoutStudentInput = {
    id?: number
    className: string
    note?: string
    updatedAt?: Date | string
  }

  export type HomeroomNoteCreateOrConnectWithoutStudentInput = {
    where: HomeroomNoteWhereUniqueInput
    create: XOR<HomeroomNoteCreateWithoutStudentInput, HomeroomNoteUncheckedCreateWithoutStudentInput>
  }

  export type PersonalityCreateWithoutStudentInput = {
    className: string
    suluk?: string
    muwadhotah?: string
    nadzofah?: string
    indhiplat?: string
  }

  export type PersonalityUncheckedCreateWithoutStudentInput = {
    id?: number
    className: string
    suluk?: string
    muwadhotah?: string
    nadzofah?: string
    indhiplat?: string
  }

  export type PersonalityCreateOrConnectWithoutStudentInput = {
    where: PersonalityWhereUniqueInput
    create: XOR<PersonalityCreateWithoutStudentInput, PersonalityUncheckedCreateWithoutStudentInput>
  }

  export type ScoreRecordCreateWithoutStudentInput = {
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
    subject: SubjectCreateNestedOneWithoutScoreRecordsInput
  }

  export type ScoreRecordUncheckedCreateWithoutStudentInput = {
    id?: number
    subjectId: number
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
  }

  export type ScoreRecordCreateOrConnectWithoutStudentInput = {
    where: ScoreRecordWhereUniqueInput
    create: XOR<ScoreRecordCreateWithoutStudentInput, ScoreRecordUncheckedCreateWithoutStudentInput>
  }

  export type ScoreRecordCreateManyStudentInputEnvelope = {
    data: ScoreRecordCreateManyStudentInput | ScoreRecordCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type TahfidzCreateWithoutStudentInput = {
    juz: number
    surah: string
    ayat: string
    predicate: string
    date?: Date | string
  }

  export type TahfidzUncheckedCreateWithoutStudentInput = {
    id?: number
    juz: number
    surah: string
    ayat: string
    predicate: string
    date?: Date | string
  }

  export type TahfidzCreateOrConnectWithoutStudentInput = {
    where: TahfidzWhereUniqueInput
    create: XOR<TahfidzCreateWithoutStudentInput, TahfidzUncheckedCreateWithoutStudentInput>
  }

  export type TahfidzCreateManyStudentInputEnvelope = {
    data: TahfidzCreateManyStudentInput | TahfidzCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AssessmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: AssessmentWhereUniqueInput
    update: XOR<AssessmentUpdateWithoutStudentInput, AssessmentUncheckedUpdateWithoutStudentInput>
    create: XOR<AssessmentCreateWithoutStudentInput, AssessmentUncheckedCreateWithoutStudentInput>
  }

  export type AssessmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: AssessmentWhereUniqueInput
    data: XOR<AssessmentUpdateWithoutStudentInput, AssessmentUncheckedUpdateWithoutStudentInput>
  }

  export type AssessmentUpdateManyWithWhereWithoutStudentInput = {
    where: AssessmentScalarWhereInput
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type AttendanceUpsertWithWhereUniqueWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutStudentInput, AttendanceUncheckedUpdateWithoutStudentInput>
    create: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutStudentInput, AttendanceUncheckedUpdateWithoutStudentInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutStudentInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutStudentInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: IntFilter<"Attendance"> | number
    studentId?: IntFilter<"Attendance"> | number
    status?: StringFilter<"Attendance"> | string
    date?: DateTimeFilter<"Attendance"> | Date | string
  }

  export type HomeroomNoteUpsertWithoutStudentInput = {
    update: XOR<HomeroomNoteUpdateWithoutStudentInput, HomeroomNoteUncheckedUpdateWithoutStudentInput>
    create: XOR<HomeroomNoteCreateWithoutStudentInput, HomeroomNoteUncheckedCreateWithoutStudentInput>
    where?: HomeroomNoteWhereInput
  }

  export type HomeroomNoteUpdateToOneWithWhereWithoutStudentInput = {
    where?: HomeroomNoteWhereInput
    data: XOR<HomeroomNoteUpdateWithoutStudentInput, HomeroomNoteUncheckedUpdateWithoutStudentInput>
  }

  export type HomeroomNoteUpdateWithoutStudentInput = {
    className?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HomeroomNoteUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonalityUpsertWithoutStudentInput = {
    update: XOR<PersonalityUpdateWithoutStudentInput, PersonalityUncheckedUpdateWithoutStudentInput>
    create: XOR<PersonalityCreateWithoutStudentInput, PersonalityUncheckedCreateWithoutStudentInput>
    where?: PersonalityWhereInput
  }

  export type PersonalityUpdateToOneWithWhereWithoutStudentInput = {
    where?: PersonalityWhereInput
    data: XOR<PersonalityUpdateWithoutStudentInput, PersonalityUncheckedUpdateWithoutStudentInput>
  }

  export type PersonalityUpdateWithoutStudentInput = {
    className?: StringFieldUpdateOperationsInput | string
    suluk?: StringFieldUpdateOperationsInput | string
    muwadhotah?: StringFieldUpdateOperationsInput | string
    nadzofah?: StringFieldUpdateOperationsInput | string
    indhiplat?: StringFieldUpdateOperationsInput | string
  }

  export type PersonalityUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    suluk?: StringFieldUpdateOperationsInput | string
    muwadhotah?: StringFieldUpdateOperationsInput | string
    nadzofah?: StringFieldUpdateOperationsInput | string
    indhiplat?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreRecordUpsertWithWhereUniqueWithoutStudentInput = {
    where: ScoreRecordWhereUniqueInput
    update: XOR<ScoreRecordUpdateWithoutStudentInput, ScoreRecordUncheckedUpdateWithoutStudentInput>
    create: XOR<ScoreRecordCreateWithoutStudentInput, ScoreRecordUncheckedCreateWithoutStudentInput>
  }

  export type ScoreRecordUpdateWithWhereUniqueWithoutStudentInput = {
    where: ScoreRecordWhereUniqueInput
    data: XOR<ScoreRecordUpdateWithoutStudentInput, ScoreRecordUncheckedUpdateWithoutStudentInput>
  }

  export type ScoreRecordUpdateManyWithWhereWithoutStudentInput = {
    where: ScoreRecordScalarWhereInput
    data: XOR<ScoreRecordUpdateManyMutationInput, ScoreRecordUncheckedUpdateManyWithoutStudentInput>
  }

  export type TahfidzUpsertWithWhereUniqueWithoutStudentInput = {
    where: TahfidzWhereUniqueInput
    update: XOR<TahfidzUpdateWithoutStudentInput, TahfidzUncheckedUpdateWithoutStudentInput>
    create: XOR<TahfidzCreateWithoutStudentInput, TahfidzUncheckedCreateWithoutStudentInput>
  }

  export type TahfidzUpdateWithWhereUniqueWithoutStudentInput = {
    where: TahfidzWhereUniqueInput
    data: XOR<TahfidzUpdateWithoutStudentInput, TahfidzUncheckedUpdateWithoutStudentInput>
  }

  export type TahfidzUpdateManyWithWhereWithoutStudentInput = {
    where: TahfidzScalarWhereInput
    data: XOR<TahfidzUpdateManyMutationInput, TahfidzUncheckedUpdateManyWithoutStudentInput>
  }

  export type TahfidzScalarWhereInput = {
    AND?: TahfidzScalarWhereInput | TahfidzScalarWhereInput[]
    OR?: TahfidzScalarWhereInput[]
    NOT?: TahfidzScalarWhereInput | TahfidzScalarWhereInput[]
    id?: IntFilter<"Tahfidz"> | number
    studentId?: IntFilter<"Tahfidz"> | number
    juz?: IntFilter<"Tahfidz"> | number
    surah?: StringFilter<"Tahfidz"> | string
    ayat?: StringFilter<"Tahfidz"> | string
    predicate?: StringFilter<"Tahfidz"> | string
    date?: DateTimeFilter<"Tahfidz"> | Date | string
  }

  export type StudentCreateWithoutAssessmentsInput = {
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteCreateNestedOneWithoutStudentInput
    personality?: PersonalityCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAssessmentsInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteUncheckedCreateNestedOneWithoutStudentInput
    personality?: PersonalityUncheckedCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAssessmentsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAssessmentsInput, StudentUncheckedCreateWithoutAssessmentsInput>
  }

  export type TPCreateWithoutAssessmentsInput = {
    code: string
    description: string
    cp: CPCreateNestedOneWithoutTpsInput
  }

  export type TPUncheckedCreateWithoutAssessmentsInput = {
    id?: number
    code: string
    description: string
    cpId: number
  }

  export type TPCreateOrConnectWithoutAssessmentsInput = {
    where: TPWhereUniqueInput
    create: XOR<TPCreateWithoutAssessmentsInput, TPUncheckedCreateWithoutAssessmentsInput>
  }

  export type StudentUpsertWithoutAssessmentsInput = {
    update: XOR<StudentUpdateWithoutAssessmentsInput, StudentUncheckedUpdateWithoutAssessmentsInput>
    create: XOR<StudentCreateWithoutAssessmentsInput, StudentUncheckedCreateWithoutAssessmentsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAssessmentsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAssessmentsInput, StudentUncheckedUpdateWithoutAssessmentsInput>
  }

  export type StudentUpdateWithoutAssessmentsInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAssessmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUncheckedUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUncheckedUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type TPUpsertWithoutAssessmentsInput = {
    update: XOR<TPUpdateWithoutAssessmentsInput, TPUncheckedUpdateWithoutAssessmentsInput>
    create: XOR<TPCreateWithoutAssessmentsInput, TPUncheckedCreateWithoutAssessmentsInput>
    where?: TPWhereInput
  }

  export type TPUpdateToOneWithWhereWithoutAssessmentsInput = {
    where?: TPWhereInput
    data: XOR<TPUpdateWithoutAssessmentsInput, TPUncheckedUpdateWithoutAssessmentsInput>
  }

  export type TPUpdateWithoutAssessmentsInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cp?: CPUpdateOneRequiredWithoutTpsNestedInput
  }

  export type TPUncheckedUpdateWithoutAssessmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cpId?: IntFieldUpdateOperationsInput | number
  }

  export type StudentCreateWithoutTahfidzsInput = {
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentCreateNestedManyWithoutStudentInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteCreateNestedOneWithoutStudentInput
    personality?: PersonalityCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutTahfidzsInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentUncheckedCreateNestedManyWithoutStudentInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteUncheckedCreateNestedOneWithoutStudentInput
    personality?: PersonalityUncheckedCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutTahfidzsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutTahfidzsInput, StudentUncheckedCreateWithoutTahfidzsInput>
  }

  export type StudentUpsertWithoutTahfidzsInput = {
    update: XOR<StudentUpdateWithoutTahfidzsInput, StudentUncheckedUpdateWithoutTahfidzsInput>
    create: XOR<StudentCreateWithoutTahfidzsInput, StudentUncheckedCreateWithoutTahfidzsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutTahfidzsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutTahfidzsInput, StudentUncheckedUpdateWithoutTahfidzsInput>
  }

  export type StudentUpdateWithoutTahfidzsInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutTahfidzsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUncheckedUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUncheckedUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUncheckedUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutAttendancesInput = {
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteCreateNestedOneWithoutStudentInput
    personality?: PersonalityCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAttendancesInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentUncheckedCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteUncheckedCreateNestedOneWithoutStudentInput
    personality?: PersonalityUncheckedCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAttendancesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
  }

  export type StudentUpsertWithoutAttendancesInput = {
    update: XOR<StudentUpdateWithoutAttendancesInput, StudentUncheckedUpdateWithoutAttendancesInput>
    create: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAttendancesInput, StudentUncheckedUpdateWithoutAttendancesInput>
  }

  export type StudentUpdateWithoutAttendancesInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAttendancesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUncheckedUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUncheckedUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUncheckedUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type TeacherCreateWithoutAssignmentsInput = {
    identity_number: string
    password: string
    fullname: string
    birth_date?: string | null
    education?: string | null
    address?: string | null
    role?: string
    subjects?: SubjectCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    identity_number: string
    password: string
    fullname: string
    birth_date?: string | null
    education?: string | null
    address?: string | null
    role?: string
    subjects?: SubjectUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutAssignmentsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
  }

  export type SubjectCreateWithoutAssignmentsInput = {
    name: string
    teacher: TeacherCreateNestedOneWithoutSubjectsInput
    cps?: CPCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    name: string
    teacherId: number
    cps?: CPUncheckedCreateNestedManyWithoutSubjectInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutAssignmentsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
  }

  export type TeacherUpsertWithoutAssignmentsInput = {
    update: XOR<TeacherUpdateWithoutAssignmentsInput, TeacherUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutAssignmentsInput, TeacherUncheckedUpdateWithoutAssignmentsInput>
  }

  export type TeacherUpdateWithoutAssignmentsInput = {
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    subjects?: SubjectUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    identity_number?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_date?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    subjects?: SubjectUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type SubjectUpsertWithoutAssignmentsInput = {
    update: XOR<SubjectUpdateWithoutAssignmentsInput, SubjectUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutAssignmentsInput, SubjectUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubjectUpdateWithoutAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutSubjectsNestedInput
    cps?: CPUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    cps?: CPUncheckedUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type StudentCreateWithoutScoreRecordsInput = {
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentCreateNestedManyWithoutStudentInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteCreateNestedOneWithoutStudentInput
    personality?: PersonalityCreateNestedOneWithoutStudentInput
    tahfidzs?: TahfidzCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutScoreRecordsInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentUncheckedCreateNestedManyWithoutStudentInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteUncheckedCreateNestedOneWithoutStudentInput
    personality?: PersonalityUncheckedCreateNestedOneWithoutStudentInput
    tahfidzs?: TahfidzUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutScoreRecordsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutScoreRecordsInput, StudentUncheckedCreateWithoutScoreRecordsInput>
  }

  export type SubjectCreateWithoutScoreRecordsInput = {
    name: string
    teacher: TeacherCreateNestedOneWithoutSubjectsInput
    assignments?: AssignmentCreateNestedManyWithoutSubjectInput
    cps?: CPCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutScoreRecordsInput = {
    id?: number
    name: string
    teacherId: number
    assignments?: AssignmentUncheckedCreateNestedManyWithoutSubjectInput
    cps?: CPUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutScoreRecordsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutScoreRecordsInput, SubjectUncheckedCreateWithoutScoreRecordsInput>
  }

  export type StudentUpsertWithoutScoreRecordsInput = {
    update: XOR<StudentUpdateWithoutScoreRecordsInput, StudentUncheckedUpdateWithoutScoreRecordsInput>
    create: XOR<StudentCreateWithoutScoreRecordsInput, StudentUncheckedCreateWithoutScoreRecordsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutScoreRecordsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutScoreRecordsInput, StudentUncheckedUpdateWithoutScoreRecordsInput>
  }

  export type StudentUpdateWithoutScoreRecordsInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUpdateOneWithoutStudentNestedInput
    tahfidzs?: TahfidzUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutScoreRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUncheckedUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUncheckedUpdateOneWithoutStudentNestedInput
    personality?: PersonalityUncheckedUpdateOneWithoutStudentNestedInput
    tahfidzs?: TahfidzUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type SubjectUpsertWithoutScoreRecordsInput = {
    update: XOR<SubjectUpdateWithoutScoreRecordsInput, SubjectUncheckedUpdateWithoutScoreRecordsInput>
    create: XOR<SubjectCreateWithoutScoreRecordsInput, SubjectUncheckedCreateWithoutScoreRecordsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutScoreRecordsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutScoreRecordsInput, SubjectUncheckedUpdateWithoutScoreRecordsInput>
  }

  export type SubjectUpdateWithoutScoreRecordsInput = {
    name?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutSubjectsNestedInput
    assignments?: AssignmentUpdateManyWithoutSubjectNestedInput
    cps?: CPUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutScoreRecordsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: IntFieldUpdateOperationsInput | number
    assignments?: AssignmentUncheckedUpdateManyWithoutSubjectNestedInput
    cps?: CPUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type StudentCreateWithoutPersonalityInput = {
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentCreateNestedManyWithoutStudentInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPersonalityInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentUncheckedCreateNestedManyWithoutStudentInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    homeroomNote?: HomeroomNoteUncheckedCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPersonalityInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPersonalityInput, StudentUncheckedCreateWithoutPersonalityInput>
  }

  export type StudentUpsertWithoutPersonalityInput = {
    update: XOR<StudentUpdateWithoutPersonalityInput, StudentUncheckedUpdateWithoutPersonalityInput>
    create: XOR<StudentCreateWithoutPersonalityInput, StudentUncheckedCreateWithoutPersonalityInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPersonalityInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPersonalityInput, StudentUncheckedUpdateWithoutPersonalityInput>
  }

  export type StudentUpdateWithoutPersonalityInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPersonalityInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUncheckedUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    homeroomNote?: HomeroomNoteUncheckedUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutHomeroomNoteInput = {
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentCreateNestedManyWithoutStudentInput
    attendances?: AttendanceCreateNestedManyWithoutStudentInput
    personality?: PersonalityCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutHomeroomNoteInput = {
    id?: number
    nisn: string
    fullname: string
    birth_info?: string | null
    gender: string
    class_name: string
    address?: string | null
    assessments?: AssessmentUncheckedCreateNestedManyWithoutStudentInput
    attendances?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    personality?: PersonalityUncheckedCreateNestedOneWithoutStudentInput
    scoreRecords?: ScoreRecordUncheckedCreateNestedManyWithoutStudentInput
    tahfidzs?: TahfidzUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutHomeroomNoteInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutHomeroomNoteInput, StudentUncheckedCreateWithoutHomeroomNoteInput>
  }

  export type StudentUpsertWithoutHomeroomNoteInput = {
    update: XOR<StudentUpdateWithoutHomeroomNoteInput, StudentUncheckedUpdateWithoutHomeroomNoteInput>
    create: XOR<StudentCreateWithoutHomeroomNoteInput, StudentUncheckedCreateWithoutHomeroomNoteInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutHomeroomNoteInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutHomeroomNoteInput, StudentUncheckedUpdateWithoutHomeroomNoteInput>
  }

  export type StudentUpdateWithoutHomeroomNoteInput = {
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUpdateManyWithoutStudentNestedInput
    personality?: PersonalityUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutHomeroomNoteInput = {
    id?: IntFieldUpdateOperationsInput | number
    nisn?: StringFieldUpdateOperationsInput | string
    fullname?: StringFieldUpdateOperationsInput | string
    birth_info?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    class_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    assessments?: AssessmentUncheckedUpdateManyWithoutStudentNestedInput
    attendances?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    personality?: PersonalityUncheckedUpdateOneWithoutStudentNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutStudentNestedInput
    tahfidzs?: TahfidzUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type AssignmentCreateManyTeacherInput = {
    id?: number
    subjectId: number
    className: string
    academicYear?: string
  }

  export type SubjectCreateManyTeacherInput = {
    id?: number
    name: string
  }

  export type AssignmentUpdateWithoutTeacherInput = {
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectUpdateWithoutTeacherInput = {
    name?: StringFieldUpdateOperationsInput | string
    assignments?: AssignmentUpdateManyWithoutSubjectNestedInput
    cps?: CPUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    assignments?: AssignmentUncheckedUpdateManyWithoutSubjectNestedInput
    cps?: CPUncheckedUpdateManyWithoutSubjectNestedInput
    scoreRecords?: ScoreRecordUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentCreateManySubjectInput = {
    id?: number
    teacherId: number
    className: string
    academicYear?: string
  }

  export type CPCreateManySubjectInput = {
    id?: number
    code: string
    description: string
  }

  export type ScoreRecordCreateManySubjectInput = {
    id?: number
    studentId: number
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
  }

  export type AssignmentUpdateWithoutSubjectInput = {
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type AssignmentUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
  }

  export type AssignmentUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
  }

  export type CPUpdateWithoutSubjectInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tps?: TPUpdateManyWithoutCpNestedInput
  }

  export type CPUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tps?: TPUncheckedUpdateManyWithoutCpNestedInput
  }

  export type CPUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreRecordUpdateWithoutSubjectInput = {
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutScoreRecordsNestedInput
  }

  export type ScoreRecordUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreRecordUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
  }

  export type TPCreateManyCpInput = {
    id?: number
    code: string
    description: string
  }

  export type TPUpdateWithoutCpInput = {
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    assessments?: AssessmentUpdateManyWithoutTpNestedInput
  }

  export type TPUncheckedUpdateWithoutCpInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    assessments?: AssessmentUncheckedUpdateManyWithoutTpNestedInput
  }

  export type TPUncheckedUpdateManyWithoutCpInput = {
    id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentCreateManyTpInput = {
    id?: number
    studentId: number
    score: number
    type: string
  }

  export type AssessmentUpdateWithoutTpInput = {
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutAssessmentsNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutTpInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentUncheckedUpdateManyWithoutTpInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentCreateManyStudentInput = {
    id?: number
    tpId: number
    score: number
    type: string
  }

  export type AttendanceCreateManyStudentInput = {
    id?: number
    status: string
    date?: Date | string
  }

  export type ScoreRecordCreateManyStudentInput = {
    id?: number
    subjectId: number
    className: string
    type: string
    scoreNumber?: number
    scoreText?: string
  }

  export type TahfidzCreateManyStudentInput = {
    id?: number
    juz: number
    surah: string
    ayat: string
    predicate: string
    date?: Date | string
  }

  export type AssessmentUpdateWithoutStudentInput = {
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    tp?: TPUpdateOneRequiredWithoutAssessmentsNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    tpId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AssessmentUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    tpId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type AttendanceUpdateWithoutStudentInput = {
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScoreRecordUpdateWithoutStudentInput = {
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
    subject?: SubjectUpdateOneRequiredWithoutScoreRecordsNestedInput
  }

  export type ScoreRecordUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
  }

  export type ScoreRecordUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    className?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    scoreNumber?: IntFieldUpdateOperationsInput | number
    scoreText?: StringFieldUpdateOperationsInput | string
  }

  export type TahfidzUpdateWithoutStudentInput = {
    juz?: IntFieldUpdateOperationsInput | number
    surah?: StringFieldUpdateOperationsInput | string
    ayat?: StringFieldUpdateOperationsInput | string
    predicate?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TahfidzUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    juz?: IntFieldUpdateOperationsInput | number
    surah?: StringFieldUpdateOperationsInput | string
    ayat?: StringFieldUpdateOperationsInput | string
    predicate?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TahfidzUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    juz?: IntFieldUpdateOperationsInput | number
    surah?: StringFieldUpdateOperationsInput | string
    ayat?: StringFieldUpdateOperationsInput | string
    predicate?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}